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

const BOSS_MAX_HP = 5;
const WIDTH = 800;
const HEIGHT = 600;

export default function Juego2() {
    const touchLeft  = useRef(false);
    const touchRight = useRef(false);
    const touchJump  = useRef(false);
    const touchShoot = useRef(false);
    const canvasRef  = useRef(null);
    const audioRef   = useRef(null);
    const [isPortrait,    setIsPortrait]    = useState(false);
    const [isFullScreen,  setIsFullScreen]  = useState(false);

    /* ── Pantalla completa ─────────────────── */
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

    /* ── Orientación ───────────────────────── */
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

    /* ── Audio ─────────────────────────────── */
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
        return () => { play?.removeEventListener('click', onPlay); stop?.removeEventListener('click', onStop); };
    }, []);

    /* ── Scroll lock ───────────────────────── */
    useEffect(() => {
        const orig = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = orig; };
    }, []);

    /* ── JUEGO ─────────────────────────────── */
    useEffect(() => {
        let requestId;
        let keys       = [];
        let terrain    = [];
        let bossBullets = [];
        let frameCount = 0;
        let bossShotTimer = 0;
        let bossHitFlash  = 0;

        const friction = 0.8;
        const gravity  = 0.5;

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

        function resetPlayer() {
            player.x    = 60;
            player.y    = HEIGHT - 120;
            player.velX = 0;
            player.velY = 0;
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
            bossShotTimer = 0;
            bossHitFlash  = 0;
            frameCount    = 0;
            keys          = [];

            player = {
                x: 60, y: HEIGHT - 120,
                width: 50, height: 50,
                speed: 3, velX: 0, velY: 0,
                jumping: false, grounded: false,
                facing: 'right', shot: false,
            };

            boss = {
                x: WIDTH / 2 - 60, y: 60,
                width: 120, height: 120,
                speed: 2, direction: 'right', alive: true,
            };

            bullet = {
                x: -100, y: -100,
                width: 35, height: 10,
                speed: 8, direction: null, active: false,
            };

            terrain = [];
            // paredes y suelo
            terrain.push({ x: 0,         y: 0,          width: 1,     height: HEIGHT });
            terrain.push({ x: WIDTH - 1,  y: 0,          width: 1,     height: HEIGHT });
            terrain.push({ x: 0,         y: HEIGHT - 2,  width: WIDTH, height: 20    });
            // plataformas
            terrain.push({ x: 100, y: 430, width: 160, height: 20 });
            terrain.push({ x: 540, y: 430, width: 160, height: 20 });
            terrain.push({ x: 310, y: 330, width: 180, height: 20 });
            terrain.push({ x: 80,  y: 230, width: 130, height: 20 });
            terrain.push({ x: 590, y: 230, width: 130, height: 20 });
            terrain.push({ x: 300, y: 200, width: 200, height: 20 });
        }

        reset();

        /* ── Touch controls ── */
        if (isTouchDev()) {
            const joystickBase  = document.getElementById('joystick');
            const joystickShaft = joystickBase?.querySelector('.joystick-shaft');
            const jumpButton    = document.getElementById('jump-button');
            const shootButton   = document.getElementById('shoot-button');
            const maxDist       = 30;
            let startX = 0, startY = 0;

            function onJoyStart(e) {
                e.preventDefault();
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;
            }
            function onJoyMove(e) {
                e.preventDefault();
                const dx = Math.max(-maxDist, Math.min(maxDist, e.targetTouches[0].clientX - startX));
                if (joystickShaft) joystickShaft.style.transform = `translateX(${dx}px)`;
                touchLeft.current  = dx < -10;
                touchRight.current = dx > 10;
            }
            function onJoyEnd(e) {
                e.preventDefault();
                if (joystickShaft) joystickShaft.style.transform = 'translate(0,0)';
                touchLeft.current  = false;
                touchRight.current = false;
            }
            function onJumpStart(e) { e.preventDefault(); touchJump.current = true; }
            function onJumpEnd(e)   { e.preventDefault(); touchJump.current = false; }
            function onShootStart(e){ e.preventDefault(); touchShoot.current = true; }
            function onShootEnd(e)  { e.preventDefault(); touchShoot.current = false; }
            function noScroll(e)    { e.preventDefault(); }

            joystickBase?.addEventListener('touchstart', onJoyStart,  { passive: false });
            joystickBase?.addEventListener('touchmove',  onJoyMove,   { passive: false });
            joystickBase?.addEventListener('touchend',   onJoyEnd,    { passive: false });
            joystickBase?.addEventListener('touchmove',  noScroll,    { passive: false });
            jumpButton?.addEventListener('touchstart',   onJumpStart, { passive: false });
            jumpButton?.addEventListener('touchend',     onJumpEnd,   { passive: false });
            jumpButton?.addEventListener('touchmove',    noScroll,    { passive: false });
            shootButton?.addEventListener('touchstart',  onShootStart,{ passive: false });
            shootButton?.addEventListener('touchend',    onShootEnd,  { passive: false });
            shootButton?.addEventListener('touchmove',   noScroll,    { passive: false });
        }

        function keyDown(e) { keys[e.keyCode] = true; }
        function keyUp(e)   { keys[e.keyCode] = false; }
        document.body.addEventListener('keydown', keyDown);
        document.body.addEventListener('keyup',   keyUp);

        /* ── Bucle principal ── */
        function update() {
            const canvas = document.getElementById('canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            frameCount++;

            /* Entrada jugador */
            if ((keys[38] || keys[87] || touchJump.current) && !player.jumping && player.grounded) {
                player.jumping = true;
                player.grounded = false;
                player.velY = -player.speed * 2.8;
            }
            if (keys[39] || keys[68] || touchRight.current) {
                player.facing = 'right';
                if (player.velX < player.speed) player.velX++;
            }
            if (keys[37] || keys[65] || touchLeft.current) {
                player.facing = 'left';
                if (player.velX > -player.speed) player.velX--;
            }
            if ((keys[32] || touchShoot.current) && !bullet.active) {
                bullet.active    = true;
                bullet.direction = player.facing;
                bullet.x = player.facing === 'right' ? player.x + player.width : player.x - bullet.width;
                bullet.y = player.y + 15;
            }

            /* Física */
            player.velX *= friction;
            player.velY += gravity;

            /* Canvas */
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.drawImage(imgFondo, 0, 0, WIDTH, HEIGHT);

            /* Overlay oscuro para que contraste más con el nivel 1 */
            ctx.fillStyle = 'rgba(20, 0, 40, 0.45)';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            /* Colisión jugador-terreno */
            player.grounded = false;
            for (let i = 0; i < terrain.length; i++) {
                const dir = colCheck(player, terrain[i]);
                if (dir === 'l' || dir === 'r') { player.velX = 0; }
                else if (dir === 't')            { player.velY *= -0.3; }
                else if (dir === 'b')            { player.grounded = true; player.jumping = false; player.velY = 0; }

                /* Bala-terreno */
                if (bullet.active && colCheck(bullet, terrain[i])) {
                    bullet.active = false; bullet.x = -100;
                }
            }

            /* Bala boss-terreno */
            bossBullets = bossBullets.filter(bb => {
                for (let i = 0; i < terrain.length; i++) {
                    if (colCheck(bb, terrain[i])) return false;
                }
                return true;
            });

            player.x += player.velX;
            player.y += player.velY;

            /* Mover bala jugador */
            if (bullet.active) {
                bullet.x += bullet.direction === 'right' ? bullet.speed : -bullet.speed;
                if (bullet.x < -50 || bullet.x > WIDTH + 50) { bullet.active = false; }

                /* Bala impacta boss */
                if (boss.alive && colCheck(bullet, boss)) {
                    bullet.active = false; bullet.x = -100;
                    bossHP--;
                    bossHitFlash = 18;
                    if (bossHP <= 0) { boss.alive = false; status = 'win'; }
                }
            }

            /* Boss IA */
            if (boss.alive) {
                // Cuando tiene ≤2 HP se acelera
                const speedMod = bossHP <= 2 ? 1.7 : 1;
                boss.x += boss.direction === 'right' ? boss.speed * speedMod : -boss.speed * speedMod;
                if (boss.x + boss.width >= WIDTH - 10) boss.direction = 'left';
                if (boss.x <= 10)                       boss.direction = 'right';

                // Disparo: cada 120 frames normal, cada 60 si ≤2 HP
                const shotInterval = bossHP <= 2 ? 60 : 120;
                bossShotTimer++;
                if (bossShotTimer >= shotInterval) {
                    bossShotTimer = 0;
                    const cx = boss.x + boss.width / 2;
                    const cy = boss.y + boss.height;
                    const px = player.x + player.width / 2;
                    const py = player.y + player.height / 2;
                    const dx = px - cx, dy = py - cy;
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;
                    const spd = 4;

                    // 3 balas en abanico
                    [{ offX: 0, offA: 0 }, { offX: -18, offA: -0.3 }, { offX: 18, offA: 0.3 }].forEach(({ offX, offA }) => {
                        const angle = Math.atan2(dy, dx) + offA;
                        bossBullets.push({
                            x: cx + offX - 8, y: cy,
                            width: 16, height: 16,
                            velX: Math.cos(angle) * spd,
                            velY: Math.sin(angle) * spd,
                        });
                    });
                }

                /* Boss toca jugador → resetear */
                if (colCheck(player, boss)) resetPlayer();
            }

            /* Mover y comprobar balas boss */
            bossBullets = bossBullets.filter(bb => {
                bb.x += bb.velX;
                bb.y += bb.velY;
                if (colCheck(player, bb)) { resetPlayer(); return false; }
                return bb.x > -50 && bb.x < WIDTH + 50 && bb.y < HEIGHT + 50 && bb.y > -50;
            });

            /* ── DIBUJO ── */

            /* Plataformas */
            for (let i = 3; i < terrain.length; i++) {
                const t = terrain[i];
                for (let px = t.x; px < t.x + t.width; px += 50) {
                    ctx.drawImage(imgSuelo, px, t.y, Math.min(50, t.x + t.width - px), 20);
                }
            }

            /* Boss */
            if (boss.alive) {
                if (bossHitFlash > 0) {
                    ctx.save();
                    ctx.globalAlpha = 0.55;
                    ctx.fillStyle   = '#ff0000';
                    ctx.fillRect(boss.x - 4, boss.y - 4, boss.width + 8, boss.height + 8);
                    ctx.restore();
                    bossHitFlash--;
                }

                /* Aura demoníaca pulsante */
                const pulse = 0.15 + Math.abs(Math.sin(frameCount * 0.08)) * 0.25;
                ctx.save();
                ctx.globalAlpha = pulse;
                ctx.fillStyle   = '#9900ff';
                ctx.beginPath();
                ctx.ellipse(boss.x + boss.width / 2, boss.y + boss.height / 2,
                    boss.width / 2 + 14, boss.height / 2 + 14, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                ctx.drawImage(imgPina, boss.x, boss.y, boss.width, boss.height);

                /* Ojos rojos demoníacos */
                ctx.fillStyle = '#ff0000';
                ctx.beginPath(); ctx.arc(boss.x + 35, boss.y + 40, 8, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(boss.x + 85, boss.y + 40, 8, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(boss.x + 37, boss.y + 38, 3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(boss.x + 87, boss.y + 38, 3, 0, Math.PI * 2); ctx.fill();

                /* Barra de vida */
                const barW = boss.width + 20;
                const barX = boss.x - 10;
                const barY = boss.y - 22;
                ctx.fillStyle = '#1a0000';
                ctx.fillRect(barX, barY, barW, 13);
                const pct   = bossHP / BOSS_MAX_HP;
                ctx.fillStyle = pct > 0.6 ? '#22dd44' : pct > 0.3 ? '#ffaa00' : '#ff2200';
                ctx.fillRect(barX, barY, barW * pct, 13);
                ctx.strokeStyle = '#ffffff88';
                ctx.lineWidth = 1;
                ctx.strokeRect(barX, barY, barW, 13);

                // Corazones de vida
                for (let h = 0; h < BOSS_MAX_HP; h++) {
                    ctx.font = '11px serif';
                    ctx.fillStyle = h < bossHP ? '#ff2255' : '#441122';
                    ctx.fillText('♥', barX + h * (barW / BOSS_MAX_HP) + 3, barY + 11);
                }
            }

            /* Balas del boss */
            bossBullets.forEach(bb => {
                ctx.save();
                const grad = ctx.createRadialGradient(
                    bb.x + bb.width / 2, bb.y + bb.height / 2, 1,
                    bb.x + bb.width / 2, bb.y + bb.height / 2, bb.width / 2
                );
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.4, '#ff8800');
                grad.addColorStop(1, '#ff000000');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(bb.x + bb.width / 2, bb.y + bb.height / 2, bb.width / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            /* Bala jugador */
            if (bullet.active) {
                ctx.fillStyle = '#FDDD32';
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            }

            /* Jugador */
            if (player.facing === 'right') ctx.drawImage(imgYo,     player.x, player.y, player.width, player.height);
            else                           ctx.drawImage(imgYoLeft, player.x, player.y, player.width, player.height);

            /* HUD — nombre del boss */
            ctx.save();
            ctx.fillStyle = 'rgba(60, 0, 80, 0.75)';
            ctx.fillRect(WIDTH / 2 - 155, 8, 310, 28);
            ctx.fillStyle = '#ff44aa';
            ctx.font      = 'bold 12px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('☠ PIÑA DEMONÍACA ☠', WIDTH / 2, 26);
            ctx.textAlign = 'left';
            ctx.restore();

            /* Pantalla de victoria */
            if (status === 'win') {
                ctx.save();
                ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.78, 0.3 + frameCount * 0.008)})`;
                ctx.fillRect(0, 0, WIDTH, HEIGHT);

                ctx.textAlign = 'center';

                ctx.fillStyle = `hsl(${frameCount * 6 % 360}, 100%, 60%)`;
                ctx.font      = 'bold 28px "Press Start 2P", monospace';
                ctx.fillText('¡DERROTADA!', WIDTH / 2, HEIGHT / 2 - 50);

                ctx.fillStyle = '#FFD700';
                ctx.font      = '14px "Press Start 2P", monospace';
                ctx.fillText('La Piña ha caído.', WIDTH / 2, HEIGHT / 2);

                ctx.fillStyle = '#ffffff';
                ctx.font      = '11px "Press Start 2P", monospace';
                ctx.fillText('Pulsa ESPACIO para continuar', WIDTH / 2, HEIGHT / 2 + 40);

                ctx.textAlign = 'left';
                ctx.restore();

                if (keys[32] || touchShoot.current) {
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
