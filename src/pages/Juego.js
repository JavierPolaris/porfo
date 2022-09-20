import React, { useEffect } from 'react';
import Suelo from '../assets/img/suelo1.png';
import Lemming from '../assets/img/lemming.gif'
import Captus from '../assets/img/yo.png'
import YoLeft from '../assets/img/yoLeft.png'
import Piper from '../assets/img/piper.png'
import PiperS from '../assets/img/piperS.png'
import Pina from '../assets/img/piña.png'
import Lava from '../assets/img/lava.png'
import SGruta from '../assets/img/sueloC.png'
import Fondo from '../assets/img/fondo.png'
import Play from '../assets/img/play.png';
import Stop from '../assets/img/stop.png';
import Musica from '../assets/music/musica.mp3';
import Back from '../assets/img/back.png';





export default function Juego() {

    useEffect(() => {
        //Musica
        document.querySelector(".stop").addEventListener("click", callar);
        document.querySelector(".play").addEventListener("click", sonar);


        function sonar() {
            var sonido = document.createElement("iframe");
            sonido.setAttribute("src", Musica);
            document.body.appendChild(sonido);
            document.querySelector("play").removeEventListener("click", sonar);
        }

        function callar() {

            var iframe = document.getElementsByTagName("iframe");

            if (iframe.length > 0) {
                iframe[0].parentNode.removeChild(iframe[0]);
                document.querySelector("play").addEventListener("click", sonar);
            }
        }

        //aseguramos que solo inicializamos el ciclo de actualización una vez
        var gameStarted = false;

        //animation frames
        (function () {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        })();

        //globales
        var canvas,
            f_img,
            yo2,
            fondo,
            pizaS,
            sSuelo,
            suelo,
            lava,
            pina,
            piper,
            image,
            ctx,
            width,
            status,
            height,
            player,
            mrPeperoni,
            mrPeperoniS,
            mrPeperoni1,
            mrPeperoni2,
            mrPeperoni3,
            keys,
            terrain,
            bumpers,
            evil,
            bullet,
            evilBullet,
            friction,
            gravity,
            enemy1,
            enemy2,
            enemy3,
            sniper,
            hellfire;

        //función de reinicio para configurar/restablecer globales
        function reset() {

            yo2 = new Image();
            yo2.src = YoLeft;

            fondo = new Image();
            fondo.src = Fondo;

            pizaS = new Image();
            pizaS.src = PiperS;

            image = new Image();
            image.src = Captus;


            lava = new Image();
            lava.src = Lava;

            suelo = new Image();
            suelo.src = Suelo;

            sSuelo = new Image();
            sSuelo.src = SGruta;

            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");


            piper = document.querySelector('.piper');
            pina = document.querySelector('.pina');
            width = 800;
            status = 'playing';
            height = 600;
            player = {

                color: '#B9DAFB',
                x: 0,
                y: height / 2,
                width: 50,
                height: 50,
                speed: 6,
                velX: 0,
                velY: 0,
                jumping: false,
                grounded: false,
                facing: 'right',
                shot: false
            };

            mrPeperoni = {
                width: 50,
                height: 50,
                x: width - 51,
                y: 35
            };

            mrPeperoniS = {
                width: 120,
                height: 120,
                x: width - 751,
                y: -30
            };
            mrPeperoni1 = {
                width: 50,
                height: 50,
                x: width - 180,
                y: 195
            }
            mrPeperoni2 = {
                width: 50,
                height: 50,
                x: width - 380,
                y: 424
            }
            mrPeperoni3 = {
                width: 50,
                height: 50,
                x: width - 550,
                y: 115
            }

            keys = [];
            terrain = [];
            bumpers = [];
            evil = [];
            bullet = {
                color: '#FDDD32',
                width: 35,
                height: 10,
                x: -10,
                y: -10,
                speed: 8,
                direction: null
            };
            evilBullet = {
                x: -10,
                y: -10,
                width: 20,
                height: 20,
                speed: 8,
                mortal: false
            };
            friction = 0.8;
            gravity = 0.8;
            enemy1 = {
                color: '#E3504B',
                x: 120,
                y: 200,
                width: 60,
                height: 60,
                speed: 4,
                direction: 'down',
                alive: true,
                mortal: true
            };
            enemy2 = {
                x: 416,
                y: 417,
                width: 60,
                height: 60,
                speed: 2,
                direction: 'right',
                alive: true,
                mortal: true,
            };
            enemy3 = {
                x: 556,
                y: 25,
                width: 60,
                height: 60,
                speed: 2,
                direction: 'left',
                alive: true,
                mortal: true
            };
            sniper = {
                x: 305,
                y: 186,
                width: 60,
                height: 60,
                alive: true,
                mortal: true,
                shot: false,
            };
            hellfire = {
                x: 200,
                y: height - 40,
                width: width - 200,
                height: 40,
                mortal: false
            };

            //enemigos dentro de evil para la colisión
            evil.push(enemy1);
            evil.push(hellfire);
            evil.push(enemy2);
            evil.push(enemy3);
            evil.push(sniper);
            evil.push(evilBullet);

            //parachoques(terreno invisible) para los enemigos
            bumpers.push({
                x: 306,
                y: 460,
                width: 40,
                height: 40
            });

            bumpers.push({
                x: 520,
                y: 460,
                width: 40,
                height: 40
            });

            bumpers.push({
                x: 356,
                y: 40,
                width: 40,
                height: 40
            });
            bumpers.push({
                x: 596,
                y: 40,
                width: 40,
                height: 40
            });


            // Terreno

            //pared de la izquierda
            terrain.push({
                x: 0,
                y: 0,
                width: 1,
                height: height
            });
            //suelo
            terrain.push({
                x: 0,
                y: height - 2,
                width: width,
                height: 50
            });
            //pared de la derecha
            terrain.push({
                x: width - 1,
                y: 0,
                width: 1,
                height: height
            });

            //cueva

            terrain.push({
                x: 130,
                y: 170,
                width: 40,
                height: 40
            });

            terrain.push({
                x: 0,
                y: 400,
                width: 200,
                height: 200
            });

            //plataforma-1

            terrain.push({
                x: 556,
                y: 480,
                width: 20,
                height: 40
            });
            //plataforma-2
            terrain.push({
                x: 356,
                y: 470,
                width: 150,
                height: 40
            });
            //plataforma-2
            terrain.push({
                x: 250,
                y: 480,
                width: 20,
                height: 40
            });

            //escaleras
            terrain.push({
                x: 646,
                y: 400,
                width: 200,
                height: 40
            });
            terrain.push({
                x: 686,
                y: 360,
                width: 160,
                height: 40
            });
            terrain.push({
                x: 726,
                y: 320,
                width: 160,
                height: 40
            });

            //plataforma-3
            terrain.push({
                x: 606,
                y: 240,
                width: 70,
                height: 40
            });

            //plataforma-4
            terrain.push({
                x: 396,
                y: 280,
                width: 120,
                height: 40
            });

            //plataforma-5
            terrain.push({
                x: 316,
                y: 240,
                width: 40,
                height: 40
            });

            //plataforma-6
            terrain.push({
                x: 256,
                y: 160,
                width: 40,
                height: 40
            });

            //plataforma-7
            terrain.push({
                x: 396,
                y: 80,
                width: 200,
                height: 40
            });

            //plataforma-8
            terrain.push({
                x: 646,
                y: 80,
                width: 160,
                height: 40
            });


            canvas.width = width;
            canvas.height = height;

        }

        reset();

        //bucle de juego principal
        function update() {
            // verificar la entrada del jugador
            if (keys[38] || keys[87]) {
                // flecha arriba
                if (!player.jumping && player.grounded) {
                    player.jumping = true;
                    player.grounded = false;
                    player.velY = -player.speed * 2;
                }
            }
            if (keys[39] || keys[68]) {
                // flecha derecha
                player.facing = "right";
                if (player.velX < player.speed) {
                    player.velX++;
                }

            }
            if (keys[37] || keys[65]) {
                // flecha izquierda
                if (player.velX > -player.speed) {
                    player.velX--;
                }
                player.facing = "left";
            }
            if (keys[32]) {
                // espacio
                if (status === 'win') {
                    reset();
                } else if (player.shot === false) {
                    player.shot = true;
                    bullet.direction = player.facing;
                    bullet.x = player.x + 30;
                    bullet.y = player.y + 10;
                }

            }

            if (keys[27]) {
                if (status === 'win') {
                    window.location.href = "/Home";
                }
            }

            //Física Ambiental
            player.velX *= friction;
            player.velY += gravity;

            //limpiar el canvas preparar para reiniciar
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "black";
            ctx.beginPath();

            //colision de terreno y terreno
            player.grounded = false;
            for (var i = 0; i < terrain.length; i++) {
                //dibujar terreno
                ctx.rect(terrain[i].x, terrain[i].y, terrain[i].width, terrain[i].height);

                //colisión jugador-terreno
                var dir = colCheck(player, terrain[i]);

                if (dir === "l" || dir === "r") {
                    player.velX = 0;
                    player.jumping = false;
                } else if (dir === "t") {
                    player.velY *= -1;
                } else if (dir === "b") {
                    player.grounded = true;
                    player.jumping = false;
                }

                //colisión bala-terreno
                var dth = colCheck(bullet, terrain[i]);

                if (dth != null) {
                    player.shot = false;
                }

                //colisión evil-bala-terreno
                var dte = colCheck(evilBullet, terrain[i]);

                if (dte != null) {
                    sniper.shot = false;
                }


                //enemigo1-terreno colision
                var dbz = colCheck(enemy1, terrain[i]);

                if (dbz === "l" || dbz === "r") {

                } else if (dbz === "t") {
                    enemy1.direction = 'down';
                } else if (dbz === "b") {
                    enemy1.direction = 'up';
                }

            }

            //verificar la colisión jugador/mrPeperoni
            var love = colCheck(player, mrPeperoni);

            //si el jugador ha llegado al peperoniMaster, establecer el status del juego en win
            if (love != null) {
                status = 'win';
            }
            //verificar la colisión jugador/mrPeperoni1
            var love1 = colCheck(player, mrPeperoni1);

            //si el jugador ha llegado al peperoniMaster1, establecer el status del juego en win
            if (love1 != null) {
                status = 'puntos1';

            }
            //verificar la colisión jugador/mrPeperoni2
            var love2 = colCheck(player, mrPeperoni2);

            //si el jugador ha llegado al peperoniMaster, establecer el status del juego en win
            if (love2 != null) {
                status = 'puntos'


            }
            //verificar la colisión jugador/mrPeperoni2
            var love3 = colCheck(player, mrPeperoni3);

            //si el jugador ha llegado al peperoniMaster, establecer el status del juego en win
            if (love3 != null) {
                status = 'puntos2';

            }



            //verificar jugador/evil colision
            for (var i = 0; i < evil.length; i++) {

                var dir = colCheck(player, evil[i]);

                if (dir != null) {
                    resetPlayer();
                }

                //verificar disparot/evil colision
                if (evil[i].mortal) {
                    var dth = colCheck(bullet, evil[i]);
                    if (dth === "l" || dth === "r") {
                        evil[i].alive = false;
                        player.shot = false;
                    } else if (dth === "t") {
                        evil[i].alive = false;
                        player.shot = false;
                    } else if (dth === "b") {
                        evil[i].alive = false;
                        player.shot = false;
                    }

                    //si mueres, teletransporta el cadáver fuera de la pantalla
                    if (!evil[i].alive) {
                        evil[i].x = -500;
                        evil[i].y = -500;
                    }
                }

            }

            //verificar enemigo / colisión de parachoques
            for (var i = 0; i < bumpers.length; i++) {
                var dir = colCheck(enemy2, bumpers[i]);
                if (dir === "l") {
                    enemy2.direction = 'right';
                }
                if (dir === "r") {
                    enemy2.direction = 'left';
                }
                var diz = colCheck(enemy3, bumpers[i]);
                if (diz === "l") {
                    enemy3.direction = 'right';
                }
                if (diz === "r") {
                    enemy3.direction = 'left';
                }
            }


            //Acciones enemigas
            if (enemy1.alive) {
                if (enemy1.direction === 'down') {
                    enemy1.y += enemy1.speed;
                } else if (enemy1.direction === 'up') {
                    enemy1.y -= enemy1.speed;
                }
            }

            if (enemy2.alive) {
                if (enemy2.direction === 'right') {
                    enemy2.x += enemy2.speed;
                } else if (enemy2.direction === 'left') {
                    enemy2.x -= enemy2.speed;
                }
            }

            if (enemy3.alive) {
                if (enemy3.direction === 'right') {
                    enemy3.x += enemy3.speed;
                } else if (enemy3.direction === 'left') {
                    enemy3.x -= enemy3.speed;
                }
            }

            if (sniper.alive === true) {
                if (sniper.shot === false) {
                    evilBullet.x = sniper.x + 40;
                    evilBullet.y = sniper.y + 15;
                    sniper.shot = true;

                }
            } else {
                evilBullet.x = 1400
            }

            if (sniper.shot) {
                evilBullet.x += evilBullet.speed;
            }

            //Acciones jugador
            if (player.grounded) {
                player.velY = 0;
            }

            player.x += player.velX;
            player.y += player.velY;

            if (player.shot) {
                if (bullet.direction === 'right') {
                    bullet.x += bullet.speed;
                } else if (bullet.direction === 'left') {
                    bullet.x -= bullet.speed;
                }
            }

            ctx.fill();
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.drawImage(fondo, 0, 0, 800, 600);

            //dibujar bala
            if (player.shot) {
                ctx.fillStyle = bullet.color;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            }

            //dibujar enemigos
            ctx.fillStyle = enemy1.color;
            for (var i = 0; i < evil.length; i++) {

                ctx.drawImage(pina, evil[i].x, evil[i].y, evil[i].width, evil[i].height);
                ctx.drawImage(lava, evil[1].x, evil[1].y, evil[1].width, evil[1].height);
            }

            //dibujar mrPeperoni
            // ctx.fillStyle = mrPeperoni.color;
            ctx.drawImage(piper, mrPeperoni.x, mrPeperoni.y, 50, 50)
            ctx.drawImage(piper, mrPeperoni1.x, mrPeperoni1.y, 50, 50)
            ctx.drawImage(piper, mrPeperoni2.x, mrPeperoni2.y, 50, 50)
            ctx.drawImage(piper, mrPeperoni3.x, mrPeperoni3.y, 50, 50)

            // dibujar Cueva
            ctx.drawImage(sSuelo, -5, 430, 50, 50)
            ctx.drawImage(sSuelo, 35, 430, 50, 50)
            ctx.drawImage(sSuelo, 75, 430, 50, 50)
            ctx.drawImage(sSuelo, 115, 430, 50, 50)
            ctx.drawImage(sSuelo, 153, 430, 50, 50)

            ctx.drawImage(sSuelo, -5, 480, 50, 50)
            ctx.drawImage(sSuelo, 35, 480, 50, 50)
            ctx.drawImage(sSuelo, 75, 480, 50, 50)
            ctx.drawImage(sSuelo, 115, 480, 50, 50)
            ctx.drawImage(sSuelo, 153, 480, 50, 50)

            ctx.drawImage(sSuelo, -5, 529, 50, 50)
            ctx.drawImage(sSuelo, 35, 529, 50, 50)
            ctx.drawImage(sSuelo, 75, 529, 50, 50)
            ctx.drawImage(sSuelo, 115, 529, 50, 50)
            ctx.drawImage(sSuelo, 153, 529, 50, 50)

            ctx.drawImage(sSuelo, -5, 559, 50, 50)
            ctx.drawImage(sSuelo, 35, 559, 50, 50)
            ctx.drawImage(sSuelo, 75, 559, 50, 50)
            ctx.drawImage(sSuelo, 115, 559, 50, 50)
            ctx.drawImage(sSuelo, 153, 559, 50, 50)

            ctx.drawImage(suelo, -5, 390, 50, 50)
            ctx.drawImage(suelo, 35, 390, 50, 50)
            ctx.drawImage(suelo, 75, 390, 50, 50)
            ctx.drawImage(suelo, 115, 390, 50, 50)
            ctx.drawImage(suelo, 153, 390, 50, 50)


            // dibujar suelo 
            //  plataforma
            ctx.drawImage(suelo, 125, 160, 50, 50)

            ctx.drawImage(suelo, 220, 470, 50, 50)

            // 9 plataforma
            ctx.drawImage(suelo, 640, 70, 50, 50)
            ctx.drawImage(suelo, 672, 70, 50, 50)
            ctx.drawImage(suelo, 712, 70, 50, 50)
            ctx.drawImage(suelo, 752, 70, 50, 50)
            // 8 plataforma
            ctx.drawImage(suelo, 390, 70, 50, 50)
            ctx.drawImage(suelo, 430, 70, 50, 50)
            ctx.drawImage(suelo, 472, 70, 50, 50)
            ctx.drawImage(suelo, 512, 70, 50, 50)
            ctx.drawImage(suelo, 552, 70, 50, 50)
            // 7 plataforma
            ctx.drawImage(suelo, 250, 150, 50, 50)
            // 6 plataforma
            ctx.drawImage(suelo, 310, 230, 50, 50)
            // 5 plataforma
            ctx.drawImage(suelo, 390, 270, 50, 50)
            ctx.drawImage(suelo, 430, 270, 50, 50)
            ctx.drawImage(suelo, 470, 270, 50, 50)
            // 4 plataforma
            ctx.drawImage(suelo, 600, 230, 50, 50)
            ctx.drawImage(suelo, 630, 230, 50, 50)
            // Escalera
            ctx.drawImage(suelo, 720, 311, 50, 50)
            ctx.drawImage(suelo, 760, 311, 50, 50)

            ctx.drawImage(suelo, 720, 351, 50, 50)
            ctx.drawImage(suelo, 760, 351, 50, 50)
            ctx.drawImage(suelo, 680, 351, 50, 50)

            ctx.drawImage(suelo, 720, 390, 50, 50)
            ctx.drawImage(suelo, 760, 390, 50, 50)
            ctx.drawImage(suelo, 680, 390, 50, 50)
            ctx.drawImage(suelo, 640, 390, 50, 50)
            // 3 plataforma
            ctx.drawImage(suelo, 552, 470, 25, 50)
            // 2 plataforma
            ctx.drawImage(suelo, 460, 460, 50, 50)
            ctx.drawImage(suelo, 420, 460, 50, 50)
            ctx.drawImage(suelo, 380, 460, 50, 50)
            ctx.drawImage(suelo, 350, 460, 50, 50)



            //dibujar jugador


            ctx.drawImage(image, player.x, player.y, player.width, player.height)


            //dibujar victoria
            if (status === 'win') {
                window.location.href = "/about";
                // ctx.fillStyle = '#000';
                // ctx.fillRect(0, 0, width, height);
                // ctx.fillStyle = '#fff';
                // ctx.font = '20pt Helvetica';
                // ctx.textAlign = 'center';
                // ctx.fillText("VICTORY", width / 2, height / 2);
                // ctx.fillText("Press Space to Retry or Press Esc to return Home", width / 2, height / 2 + 40);
            }
            //dibujar score
            if (status === 'puntos') {
                mrPeperoni2.x = 1000;
                ctx.fillStyle = '#000';
                ctx.font = '30px Verdana';
                ctx.textPosition = 'left';
                ctx.drawImage(pizaS, 30, 40)
                ctx.drawImage(pizaS, mrPeperoniS.x, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)
                ctx.drawImage(piper, mrPeperoniS.x, 0, mrPeperoni.width, mrPeperoni.height)
                ctx.drawImage(pizaS, mrPeperoniS.x + 40, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)
                ctx.drawImage(pizaS, mrPeperoniS.x + 80, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)



            } else if (status === 'puntos1') {
                mrPeperoni1.x = 1000;
                ctx.fillStyle = '#000';
                ctx.font = '30px Verdana';
                ctx.textPosition = 'left';

                ctx.drawImage(piper, mrPeperoniS.x + 40, 0, mrPeperoni.width, mrPeperoni.height)
                ctx.drawImage(piper, mrPeperoniS.x, 0, mrPeperoni.width, mrPeperoni.height)
                ctx.drawImage(pizaS, mrPeperoniS.x + 40, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)
                ctx.drawImage(pizaS, mrPeperoniS.x + 80, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)



            } else if (status === 'puntos2') {
                mrPeperoni3.x = 1000;
                ctx.fillStyle = '#000';
                ctx.font = '30px Verdana';
                ctx.textPosition = 'left';
                ctx.drawImage(piper, mrPeperoniS.x + 80, 0, mrPeperoni.width, mrPeperoni.height)
                ctx.drawImage(piper, mrPeperoniS.x + 40, 0, mrPeperoni.width, mrPeperoni.height)
                ctx.drawImage(piper, mrPeperoniS.x, 0, mrPeperoni.width, mrPeperoni.height)
                ctx.drawImage(pizaS, mrPeperoniS.x + 80, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)


            } else {
                ctx.fillStyle = '#000';
                ctx.font = '30px Verdana';
                ctx.textPosition = 'left';

                ctx.drawImage(pizaS, mrPeperoniS.x, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)
                ctx.drawImage(pizaS, mrPeperoniS.x - 40, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)
                ctx.drawImage(pizaS, mrPeperoniS.x + 40, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)
                ctx.drawImage(pizaS, mrPeperoniS.x + 80, mrPeperoniS.y, mrPeperoniS.width, mrPeperoniS.height)
            }


            requestAnimationFrame(update);
        }

        //si el jugador es golpeado por los malos, vuelve a aparecer
        function resetPlayer() {
            player.x = 0;
            player.y = height / 2;
        }

        //detectar colision
        function colCheck(shapeA, shapeB) {
            // obtener los vectores para comprobar 
            var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
                vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
                // agregar la mitad del ancho y la mitad de la altura de los objetos
                hWidths = (shapeA.width / 2) + (shapeB.width / 2),
                hHeights = (shapeA.height / 2) + (shapeB.height / 2),
                colDir = null;

            // si los vectores X e Y son menores que la mitad del ancho o la mitad de la altura, deben estar dentro del objeto, causando una colisión
            if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
                // averiguar de que lado estamos chocando (arriba, abajo, izquierda o derecha)
                var oX = hWidths - Math.abs(vX),
                    oY = hHeights - Math.abs(vY);
                if (oX >= oY) {
                    if (vY > 0) {
                        colDir = "t";
                        shapeA.y += oY;
                    } else {
                        colDir = "b";
                        shapeA.y -= oY;
                    }
                } else {
                    if (vX > 0) {
                        colDir = "l";
                        shapeA.x += oX;
                    } else {
                        colDir = "r";
                        shapeA.x -= oX;
                    }
                }
            }
            return colDir;
        }

        //manejo del teclado
        document.body.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
        });

        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });

        update();
    })



    return (
        <div className='center'>


            <div id="despertador" style={{display:'none'}} >
                <h2 className='soniquete'>Music</h2>
                <button className="play">
                    <img src={Play} className='play1' />
                </button>
                <button className="stop">
                    <img src={Stop} className='stop1' />
                </button>
                {/* <iframe src={Musica} className='sonido' autoplay>
                </iframe> */}


            </div>
            <img src={Back} className='back' />
            <canvas id="canvas" style={{
                position: "absolute",
                left: "348px",
                top: "0px"
            }}>
                {/* <div className="lemming--walker" ></div> */}
                <img src={Lemming} className='lemming' />
                <img src={Pina} className='pina' />
                <img src={Piper} className='piper' />
                <img src={Piper} className='piper1' />
                <img src={Piper} className='piper2' />
                <img src={Piper} className='piper3' />

            </canvas>

            {/* <div className="score">0</div> */}

        </div>

    )
}
