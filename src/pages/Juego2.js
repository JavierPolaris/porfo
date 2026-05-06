import React, { useEffect, useRef, useState } from 'react';
import Captus from '../assets/img/yo.png';
import YoLeft from '../assets/img/yoLeft.png';
import Pina from '../assets/img/piña.png';
import Suelo from '../assets/img/suelo1.png';
import Fondo from '../assets/img/fondo.png';
import Play from '../assets/img/play.png';
import Stop from '../assets/img/stop.png';
import Musica from '../assets/music/musica.mp3';
import Pantalla from '../assets/img/fullscreen.png';

const BOSS_MAX_HP = 8;
const WIDTH  = 800;
const HEIGHT = 600;
const FLOOR  = HEIGHT - 2;

export default function Juego2() {
    const touchLeft  = useRef(false);
    const touchRight = useRef(false);
    const touchJump  = useRef(false);
    const touchShoot = useRef(false);
    const canvasRef  = useRef(null);
    const audioRef   = useRef(null);
    const [isPortrait,   setIsPortrait]   = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        const elem = document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            (elem.requestFullscreen || elem.webkitRequestFullscreen).call(elem)
                .then(() => { lockOrientation(); setIsFullScreen(true); })
                .catch(() => {});
        } else {
            (document.exitFullscreen || document.webkitExitFullscreen).call(document)
                .then(() => setIsFullScreen(false)).catch(() => {});
        }
    };

    function lockOrientation() {
        if (window.screen.orientation?.lock)
            window.screen.orientation.lock('landscape').catch(() => {});
    }

    useEffect(() => {
        const handle = () => setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
        handle();
        window.addEventListener('orientationchange', handle);
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('orientationchange', handle);
            window.removeEventListener('resize', handle);
        };
    }, []);

    useEffect(() => {
        audioRef.current = new Audio(Musica);
        audioRef.current.loop   = true;
        audioRef.current.volume = 0.5;
        const play = document.querySelector('.play');
        const stop = document.querySelector('.stop');
        const onPlay = () => audioRef.current.play();
        const onStop = () => { audioRef.current.pause(); audioRef.current.currentTime = 0; };
        play?.addEventListener('click', onPlay);
        stop?.addEventListener('click', onStop);
        return () => {
            play?.removeEventListener('click', onPlay);
            stop?.removeEventListener('click', onStop);
        };
    }, []);

    useEffect(() => {
        const orig = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = orig; };
    }, []);

    useEffect(() => {
        let requestId;
        let keys         = [];
        let terrain      = [];
        let bossBullets  = [];
        let shockwaves   = [];
        let frameCount   = 0;
        let bossHitFlash = 0;
        let winStartFrame = 0;
        let jumpKeyPrev  = false;  // edge-detection para no repetir salto al mantener pulsado

        const friction    = 0.8;
        const gravity     = 0.2;   // igual que nivel 1 → protagonista fluido
        const bossGravity = 0.5;   // jefe más pesado

        let status, player, boss, bullet, bossHP;
        let imgYo, imgYoLeft, imgPina, imgSuelo, imgFondo;

        function isTouchDev() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }

        function colCheck(A, B) {
            const vX = (A.x + A.width / 2) - (B.x + B.width / 2);
            const vY = (A.y + A.height / 2) - (B.y + B.height / 2);
            const hw = A.width / 2 + B.width / 2;
            const hh = A.height / 2 + B.height / 2;
            if (Math.abs(vX) >= hw || Math.abs(vY) >= hh) return null;
            const oX = hw - Math.abs(vX);
            const oY = hh - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) { A.y += oY; return 't'; }
                else        { A.y -= oY; return 'b'; }
            } else {
                if (vX > 0) { A.x += oX; return 'l'; }
                else        { A.x -= oX; return 'r'; }
            }
        }

        function overlaps(A, B) {
            return A.x < B.x + B.width  && A.x + A.width  > B.x &&
                   A.y < B.y + B.height && A.y + A.height > B.y;
        }

        function resetPlayer() {
            player.x      = 60;
            player.y      = FLOOR - 60;
            player.velX   = 0;
            player.velY   = 0;
            player.jumpsLeft = 2;
        }

        function reset() {
            imgYo     = new Image(); imgYo.src     = Captus;
            imgYoLeft = new Image(); imgYoLeft.src = YoLeft;
            imgPina   = new Image(); imgPina.src   = Pina;
            imgSuelo  = new Image(); imgSuelo.src  = Suelo;
            imgFondo  = new Image(); imgFondo.src  = Fondo;

            const canvas = document.getElementById('canvas');
            canvas.width  = WIDTH;
            canvas.height = HEIGHT;

            status        = 'playing';
            bossHP        = BOSS_MAX_HP;
            bossBullets   = [];
            shockwaves    = [];
            bossHitFlash  = 0;
            winStartFrame = 0;
            frameCount    = 0;
            jumpKeyPrev   = false;
            keys          = [];

            player = {
                x: 60, y: FLOOR - 60,
                width: 50, height: 50,
                speed: 3, velX: 0, velY: 0,
                jumping: false, grounded: false,
                facing: 'right',
                jumpsLeft: 2,   // doble salto como en nivel 2 de Metal Slug
            };

            boss = {
                x: WIDTH - 210, y: FLOOR - 95,
                width: 95, height: 95,
                baseSpeed: 1.4,
                velX: 0, velY: 0,
                grounded: true,
                direction: 'left',
                state: 'walk',
                stateTimer: 0,
                nextAction: 150,
                shotTimer: 60,
                alive: true,
            };

            bullet = {
                x: -100, y: -100,
                width: 35, height: 10,
                speed: 8, direction: null, active: false,
            };

            terrain = [];
            terrain.push({ x: 0,        y: 0,     width: 1,     height: HEIGHT });
            terrain.push({ x: WIDTH - 1, y: 0,     width: 1,     height: HEIGHT });
            terrain.push({ x: 0,        y: FLOOR,  width: WIDTH, height: 20     });

            // Plataformas en escalera — cada nivel alcanzable desde el anterior
            // con salto = speed*2 = 6, gravity = 0.2 → altura máx ~93 px por salto
            terrain.push({ x: 60,  y: 475, width: 200, height: 20 }); // paso 1 izq (desde suelo)
            terrain.push({ x: 540, y: 475, width: 200, height: 20 }); // paso 1 der
            terrain.push({ x: 240, y: 358, width: 320, height: 20 }); // paso 2 centro
            terrain.push({ x: 60,  y: 242, width: 180, height: 20 }); // paso 3 izq
            terrain.push({ x: 560, y: 242, width: 180, height: 20 }); // paso 3 der
            terrain.push({ x: 270, y: 132, width: 260, height: 20 }); // paso 4 alto
        }

        reset();

        if (isTouchDev()) {
            const joystickBase  = document.getElementById('joystick');
            const joystickShaft = joystickBase?.querySelector('.joystick-shaft');
            const jumpButton    = document.getElementById('jump-button');
            const shootButton   = document.getElementById('shoot-button');
            const maxDist       = 30;
            let startX = 0;

            const onJoyStart  = e => { e.preventDefault(); startX = e.targetTouches[0].clientX; };
            const onJoyMove   = e => {
                e.preventDefault();
                const dx = Math.max(-maxDist, Math.min(maxDist, e.targetTouches[0].clientX - startX));
                if (joystickShaft) joystickShaft.style.transform = `translateX(${dx}px)`;
                touchLeft.current  = dx < -10;
                touchRight.current = dx > 10;
            };
            const onJoyEnd    = e => {
                e.preventDefault();
                if (joystickShaft) joystickShaft.style.transform = 'translate(0,0)';
                touchLeft.current  = false;
                touchRight.current = false;
            };
            const onJumpStart  = e => { e.preventDefault(); touchJump.current  = true;  };
            const onJumpEnd    = e => { e.preventDefault(); touchJump.current  = false; };
            const onShootStart = e => { e.preventDefault(); touchShoot.current = true;  };
            const onShootEnd   = e => { e.preventDefault(); touchShoot.current = false; };
            const noScroll     = e => e.preventDefault();

            joystickBase?.addEventListener('touchstart', onJoyStart,   { passive: false });
            joystickBase?.addEventListener('touchmove',  onJoyMove,    { passive: false });
            joystickBase?.addEventListener('touchend',   onJoyEnd,     { passive: false });
            joystickBase?.addEventListener('touchmove',  noScroll,     { passive: false });
            jumpButton?.addEventListener('touchstart',   onJumpStart,  { passive: false });
            jumpButton?.addEventListener('touchend',     onJumpEnd,    { passive: false });
            jumpButton?.addEventListener('touchmove',    noScroll,     { passive: false });
            shootButton?.addEventListener('touchstart',  onShootStart, { passive: false });
            shootButton?.addEventListener('touchend',    onShootEnd,   { passive: false });
            shootButton?.addEventListener('touchmove',   noScroll,     { passive: false });
        }

        function keyDown(e) { keys[e.keyCode] = true; }
        function keyUp(e)   { keys[e.keyCode] = false; }
        document.body.addEventListener('keydown', keyDown);
        document.body.addEventListener('keyup',   keyUp);

        function update() {
            const canvas = document.getElementById('canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            frameCount++;

            /* ── Entrada del jugador ── */

            // Salto con edge-detection (no se repite al mantener pulsado)
            const jumpKeyNow = !!(keys[38] || keys[87] || touchJump.current);
            if (jumpKeyNow && !jumpKeyPrev && player.jumpsLeft > 0) {
                player.velY     = -player.speed * 2;
                player.jumping  = true;
                player.grounded = false;
                player.jumpsLeft--;
            }
            jumpKeyPrev = jumpKeyNow;

            if (keys[39] || keys[68] || touchRight.current) {
                player.facing = 'right';
                if (player.velX < player.speed) player.velX++;
            }
            if (keys[37] || keys[65] || touchLeft.current) {
                player.facing = 'left';
                if (player.velX > -player.speed) player.velX--;
            }
            if ((keys[32] || touchShoot.current) && !bullet.active && status === 'playing') {
                bullet.active    = true;
                bullet.direction = player.facing;
                bullet.x = player.facing === 'right' ? player.x + player.width : player.x - bullet.width;
                bullet.y = player.y + 15;
            }

            /* ── Física del jugador ── */
            player.velX *= friction;
            player.velY += gravity;

            /* ── Fondo ── */
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.drawImage(imgFondo, 0, 0, WIDTH, HEIGHT);
            ctx.fillStyle = 'rgba(8, 0, 25, 0.28)';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            /* ── Colisión jugador-terreno ── */
            player.grounded = false;
            for (let i = 0; i < terrain.length; i++) {
                const dir = colCheck(player, terrain[i]);
                if (dir === 'l' || dir === 'r') {
                    player.velX = 0;
                } else if (dir === 't') {
                    player.velY *= -0.3;
                } else if (dir === 'b') {
                    player.grounded = true;
                    player.jumping  = false;
                    player.jumpsLeft = 2;   // reset doble salto al aterrizar
                }
                if (bullet.active && colCheck(bullet, terrain[i])) {
                    bullet.active = false; bullet.x = -100;
                }
            }

            // Nivel 1: aplica velY=0 antes del movimiento cuando grounded
            if (player.grounded) player.velY = 0;

            /* Filtrar balas del boss que chocan con terreno */
            bossBullets = bossBullets.filter(bb => {
                for (let i = 0; i < terrain.length; i++) {
                    if (colCheck(bb, terrain[i])) return false;
                }
                return true;
            });

            player.x += player.velX;
            player.y += player.velY;

            /* ── Bala del jugador ── */
            if (bullet.active) {
                bullet.x += bullet.direction === 'right' ? bullet.speed : -bullet.speed;
                if (bullet.x < -50 || bullet.x > WIDTH + 50) bullet.active = false;

                if (boss.alive && colCheck(bullet, boss)) {
                    bullet.active = false; bullet.x = -100;
                    bossHP--;
                    bossHitFlash = 15;
                    if (bossHP <= 0) {
                        boss.alive    = false;
                        status        = 'win';
                        winStartFrame = frameCount;
                    }
                }
            }

            /* ── IA del boss (Metal Slug) ── */
            if (boss.alive) {
                const phase2       = bossHP <= 4;
                const spd          = phase2 ? boss.baseSpeed * 1.8 : boss.baseSpeed;
                const shotInterval = phase2 ? 80 : 140;

                if (!boss.grounded) boss.velY += bossGravity;

                boss.stateTimer++;

                switch (boss.state) {
                    case 'walk':
                        boss.velX = boss.direction === 'right' ? spd : -spd;
                        if (boss.x + boss.width >= WIDTH - 15) boss.direction = 'left';
                        if (boss.x <= 15)                       boss.direction = 'right';
                        if (boss.stateTimer >= boss.nextAction) {
                            boss.stateTimer = 0;
                            if (Math.random() < 0.5) {
                                boss.state     = 'charge';
                                boss.direction = player.x < boss.x + boss.width / 2 ? 'left' : 'right';
                                boss.nextAction = 65;
                            } else {
                                boss.state    = 'jump';
                                boss.velY     = -14;
                                boss.grounded = false;
                                boss.nextAction = 999;
                            }
                        }
                        break;

                    case 'charge':
                        boss.velX = boss.direction === 'right' ? spd * 4 : -spd * 4;
                        if (boss.stateTimer >= boss.nextAction ||
                            boss.x + boss.width >= WIDTH - 15 || boss.x <= 15) {
                            boss.state      = 'walk';
                            boss.stateTimer = 0;
                            boss.nextAction = 100 + Math.floor(Math.random() * 80);
                            boss.velX       = 0;
                        }
                        break;

                    case 'jump':
                        boss.velX = 0;
                        break;

                    default: break;
                }

                boss.x += boss.velX;
                boss.y += boss.velY;

                /* Aterrizaje del boss */
                if (boss.y + boss.height >= FLOOR) {
                    const wasAirborne = !boss.grounded;
                    boss.y        = FLOOR - boss.height;
                    boss.velY     = 0;
                    boss.grounded = true;
                    if (wasAirborne && boss.state === 'jump') {
                        shockwaves.push({
                            x: boss.x - 55,
                            y: FLOOR - 22,
                            width: boss.width + 110,
                            height: 22,
                            ttl: 50, maxTtl: 50,
                        });
                        boss.state      = 'walk';
                        boss.stateTimer = 0;
                        boss.nextAction = 110 + Math.floor(Math.random() * 70);
                    }
                } else {
                    boss.grounded = false;
                }

                if (boss.x < 15) {
                    boss.x = 15; boss.direction = 'right';
                    if (boss.state === 'charge') { boss.state = 'walk'; boss.stateTimer = 0; boss.nextAction = 100; boss.velX = 0; }
                }
                if (boss.x + boss.width > WIDTH - 15) {
                    boss.x = WIDTH - 15 - boss.width; boss.direction = 'left';
                    if (boss.state === 'charge') { boss.state = 'walk'; boss.stateTimer = 0; boss.nextAction = 100; boss.velX = 0; }
                }

                /* Disparos horizontales */
                boss.shotTimer++;
                if (boss.shotTimer >= shotInterval && boss.state !== 'jump') {
                    boss.shotTimer = 0;
                    const fireDir = player.x < boss.x + boss.width / 2 ? -1 : 1;
                    const fireY   = boss.y + boss.height * 0.52;
                    bossBullets.push({
                        x: fireDir > 0 ? boss.x + boss.width : boss.x - 20,
                        y: fireY - 9,
                        width: 18, height: 18,
                        velX: fireDir * 5, velY: 0,
                    });
                    if (phase2) {
                        bossBullets.push({
                            x: fireDir > 0 ? boss.x + boss.width : boss.x - 20,
                            y: fireY - 24,
                            width: 14, height: 14,
                            velX: fireDir * 4.5, velY: -1.5,
                        });
                    }
                }

                if (colCheck(player, boss)) resetPlayer();
            }

            /* ── Balas del boss ── */
            bossBullets = bossBullets.filter(bb => {
                bb.x += bb.velX;
                bb.y += bb.velY;
                if (overlaps(player, bb)) { resetPlayer(); return false; }
                return bb.x > -60 && bb.x < WIDTH + 60 && bb.y < HEIGHT + 60 && bb.y > -60;
            });

            /* ── Shockwaves ── */
            shockwaves = shockwaves.filter(sw => {
                sw.ttl--;
                sw.x     -= 3.5;
                sw.width += 7;
                if (overlaps(player, sw)) resetPlayer();
                return sw.ttl > 0;
            });

            /* ── Dibujar plataformas ── */
            for (let i = 3; i < terrain.length; i++) {
                const t = terrain[i];
                for (let px = t.x; px < t.x + t.width; px += 50) {
                    ctx.drawImage(imgSuelo, px, t.y, Math.min(50, t.x + t.width - px), 20);
                }
            }

            /* ── Dibujar shockwaves ── */
            shockwaves.forEach(sw => {
                ctx.save();
                ctx.globalAlpha = sw.ttl / sw.maxTtl * 0.88;
                const g = ctx.createLinearGradient(sw.x, sw.y, sw.x, sw.y + sw.height);
                g.addColorStop(0, '#ffee44');
                g.addColorStop(1, '#ff4400');
                ctx.fillStyle = g;
                ctx.fillRect(sw.x, sw.y, sw.width, sw.height);
                ctx.restore();
            });

            /* ── Dibujar balas del boss ── */
            bossBullets.forEach(bb => {
                ctx.save();
                const grad = ctx.createRadialGradient(
                    bb.x + bb.width / 2, bb.y + bb.height / 2, 1,
                    bb.x + bb.width / 2, bb.y + bb.height / 2, bb.width / 2
                );
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.4, '#ff8800');
                grad.addColorStop(1, 'rgba(255,0,0,0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(bb.x + bb.width / 2, bb.y + bb.height / 2, bb.width / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            /* ── Dibujar boss ── */
            if (boss.alive) {
                if (bossHitFlash > 0) {
                    ctx.save();
                    ctx.globalAlpha = 0.6;
                    ctx.fillStyle   = '#ff0000';
                    ctx.fillRect(boss.x - 4, boss.y - 4, boss.width + 8, boss.height + 8);
                    ctx.restore();
                    bossHitFlash--;
                }
                ctx.drawImage(imgPina, boss.x, boss.y, boss.width, boss.height);
            }

            /* ── Dibujar bala del jugador ── */
            if (bullet.active) {
                ctx.fillStyle = '#FDDD32';
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            }

            /* ── Dibujar jugador ── */
            if (player.facing === 'right') ctx.drawImage(imgYo,     player.x, player.y, player.width, player.height);
            else                           ctx.drawImage(imgYoLeft, player.x, player.y, player.width, player.height);

            /* ── HUD arriba (siempre encima de todo) ── */
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, 0, WIDTH, 46);
            ctx.fillStyle = '#ff9b00';
            ctx.fillRect(0, 46, WIDTH, 2);

            const heartGap    = 28;
            const heartStartX = WIDTH / 2 - (BOSS_MAX_HP * heartGap) / 2 + 4;
            ctx.font = '20px serif';
            for (let h = 0; h < BOSS_MAX_HP; h++) {
                ctx.fillStyle = h < bossHP ? '#ff2255' : 'rgba(255,255,255,0.12)';
                ctx.fillText('♥', heartStartX + h * heartGap, 34);
            }
            const barW = 260;
            const barX = WIDTH / 2 - barW / 2;
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(barX, 8, barW, 10);
            const pct = bossHP / BOSS_MAX_HP;
            ctx.fillStyle = pct > 0.5 ? '#22dd44' : pct > 0.25 ? '#ffaa00' : '#ff2200';
            ctx.fillRect(barX, 8, barW * pct, 10);
            ctx.strokeStyle = 'rgba(255,255,255,0.22)';
            ctx.lineWidth   = 1;
            ctx.strokeRect(barX, 8, barW, 10);

            /* ── Pantalla de victoria ── */
            if (status === 'win') {
                ctx.save();
                const fadeIn = Math.min(0.85, (frameCount - winStartFrame) * 0.012);
                ctx.fillStyle = `rgba(0,0,0,${fadeIn})`;
                ctx.fillRect(0, 0, WIDTH, HEIGHT);

                ctx.textAlign = 'center';
                ctx.fillStyle = `hsl(${frameCount * 5 % 360}, 100%, 60%)`;
                ctx.font      = 'bold 28px "Press Start 2P", monospace';
                ctx.fillText('¡DERROTADA!', WIDTH / 2, HEIGHT / 2 - 50);

                ctx.fillStyle = '#FFD700';
                ctx.font      = '14px "Press Start 2P", monospace';
                ctx.fillText('La Piña ha caído.', WIDTH / 2, HEIGHT / 2);

                // El aviso solo aparece cuando ya puede continuar (después del delay)
                if (frameCount > winStartFrame + 120) {
                    ctx.fillStyle = '#ffffff';
                    ctx.font      = '11px "Press Start 2P", monospace';
                    ctx.fillText('Pulsa ESPACIO para continuar', WIDTH / 2, HEIGHT / 2 + 50);
                }

                ctx.textAlign = 'left';
                ctx.restore();

                // Solo acepta input después de 120 frames (2 segundos) para que no se salte
                if (frameCount > winStartFrame + 120 && (keys[32] || touchShoot.current)) {
                    cancelAnimationFrame(requestId);
                    window.location.href = '/about';
                    return;
                }
            }

            requestId = requestAnimationFrame(update);
        }

        update();

        return () => {
            document.body.removeEventListener('keydown', keyDown);
            document.body.removeEventListener('keyup',   keyUp);
            if (requestId) cancelAnimationFrame(requestId);
            if (window.screen.orientation?.unlock) window.screen.orientation.unlock();
        };
    }, []);

    return (
        <div className='center'>
            {isPortrait && (
                <div className="portrait-overlay">
                    <p>Por favor, gira tu dispositivo a modo horizontal para jugar.</p>
                </div>
            )}

            <div id="despertador">
                <h2 className='soniquete'>Music</h2>
                <button className="play"><img src={Play} className='play1' alt="Play" /></button>
                <button className="stop"><img src={Stop} className='stop1' alt="Stop" /></button>
                <button className="fullscreen-button stop" onClick={toggleFullScreen}>
                    <img src={Pantalla} className='fullscreen-icon stop1' alt="Full Screen" />
                </button>
            </div>

            <div className="canvas-container">
                <canvas id="canvas" ref={canvasRef} />
                <div className="touch-controls">
                    <div className="joystick-base" id="joystick">
                        <div className="joystick-shaft" />
                    </div>
                    <div className="buttons">
                        <button className="jump-button"  id="jump-button">A</button>
                        <button className="shoot-button" id="shoot-button">B</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
