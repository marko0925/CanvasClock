  //SALUDO
  console.log("Made by Marlon coronel http://www.facebook.com/marlon.coronel");
  
  //VARIABLES GLOBALES
        var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        var days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
        var color = "#3498DB";
        var shadowCol = "#2980B9";

        var stage = new Konva.Stage({
            width: 550,
            height: 550,
            container: "canvas"
        });
        var layer = new Konva.Layer();
        stage.add(layer);

        var background = new Konva.Rect({
            x: 0,
            y: 0,
            width: stage.attrs.width,
            height: stage.attrs.height,
            fill: "#1F1F1F"
        });
        layer.add(background);


        //SEGUNDOS
        var arcSeconds = new Konva.Arc({
            x: stage.attrs.width / 2,
            y: stage.attrs.height / 2,
            innerRadius: 150,
            outerRadius: 170,
            fill: color,
            lineCap: "bevel",
            angle: 360,
            shadowColor: shadowCol,
            shadowBlur: 15,
            rotation: -90
        });
        layer.add(arcSeconds);


        //MINUTOS
        var arcMinutes = new Konva.Arc({
            x: stage.attrs.width / 2,
            y: stage.attrs.height / 2,
            innerRadius: 180,
            outerRadius: 200,
            fill: color,
            lineCap: "bevel",
            angle: 360,
            shadowColor: shadowCol,
            shadowBlur: 15,
            rotation: -90
        });
        layer.add(arcMinutes);

        //HORAS
        var arcHours = new Konva.Arc({
            x: stage.attrs.width / 2,
            y: stage.attrs.height / 2,
            innerRadius: 210,
            outerRadius: 230,
            fill: color,
            lineCap: "bevel",
            angle: 360,
            shadowColor: shadowCol,
            shadowBlur: 15,
            rotation: -90
        });
        layer.add(arcHours);

        //TEXTO DE FECHA
        var textDate = new Konva.Text({
            fontFamily: "Calibri",
            fontSize: 25,
            x: stage.attrs.width / 2 - 80,
            y: stage.attrs.height / 2 - 65,
            fill: color,
            align: "center",
        });
        layer.add(textDate);

        //TEXTO DE HORA
        var textHour = new Konva.Text({
            fontFamily: "Calibri",
            fontSize: 40,
            fontStyle: "bold",
            fill: color,
            align: "center",
            x: textDate.x() + 20,
            y: textDate.y() + 40
        });
        layer.add(textHour);

        new Konva.Animation(function(frame) {
            //INSTANCIAMOS UN NUEVO DATE.
            let time = new Date();
            //OBTENEMOS LAS HORAS ACTUALES
            let mHour = time.getHours();
            //CON ESTO VOLVEMOS LAS HORAS DE TIPO 24 A 12
            let hours = mHour % 12 || 12;
            //OBTENEMOS LOS MINUTOS
            let minutes = time.getMinutes();
            //OBTENEMOS LOS SEGUNDOS
            let seconds = time.getSeconds();
            //OBTENEMOS EL AÑO
            let year = time.getFullYear();
            //OBTENEMOS EL MES
            let month = time.getMonth();
            //OBTENEMOS EL DIA
            let day = time.getDay();

            //CAPTAMOS EL TIEMPO MAS EXACTAMENTE PARA QUE EL RELOJ SE VEA MAS FLUIDO
            let newseconds = seconds + (time.getMilliseconds() / 1000);
            //CAPTAMOS LOS MINUTOS + EL TIEMPO EN SEGUNDOS PARA EL SIGUIENTE MINUTO
            let newminutes = minutes + (seconds / 60);
            //CAPTAMOS LAS HORAS + EL TIEMPO EN MINUTOS PARA LA PROXIMA HORA
            let newhours = hours + (minutes / 60);

            //ACTUALIZAMOS EL RELOJ
            arcHours.angle(newhours * (360 / 12));
            arcMinutes.angle(newminutes * (360 / 60));
            arcSeconds.angle(newseconds * (360 / 60));

            //SI EL MINUTOS ES MENOR QUE 10 AGREGAMOS UN 0 (ESTETICO)
            minutes = minutes < 10 ? minutes = "0" + minutes : minutes;
            //LOS MISMO CON LOS SEGUNDOS
            seconds = seconds < 10 ? seconds = "0" + seconds : seconds;
            //INSERTAMOS EL TEXTO DE LA FECHA EN EL RELOJ
            textDate.text(days[day] + " " + months[month] + "  " + time.getDate() + " " + year);
            //INSETAMOS EL TEXTO DE LA HORA EN RELOJ
            textHour.text(hours + ":" + minutes + ":" + seconds);

        }, layer).start();

        //FUNCION ENCARGADA DE CAMBIAR EL COLOR AL RELOJ
        function changeColor(hour) {
            //console.log(hour);
            if (!checkHour(hour)) return false;
            tempHour = hour;
            console.log("tempHour "+tempHour);
            let newHex;
            console.log(color);
            let col = color.replace("#", "");
            if (hour > 5 && hour <= 12) {

                let green = parseInt(col.substr(2, 2), 16);
                let blue = parseInt(col.substr(4, 2), 16);
                console.log("5-12");
                green -= 22;
                blue -= 7;
                newHex = "#" + col.substr(0, 2) + green.toString(16) + blue.toString(16);
                //console.log(newHex);
            } else if (hour > 12 && hour <= 18) {
                let red = parseInt(col.substr(0, 2), 16);
                let green = parseInt(col.substr(2, 2), 16);
                let blue = parseInt(col.substr(4, 2), 16);
                //console.log(green);
                console.log("12-18");
                red -= 40
                green -= 35;
                blue += 40;
                newHex = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
            } else if (hour > 18 && hour <= 24 || hour > 24 && hour <= 5) {

                let red = parseInt(col.substr(0, 2), 16);
                let green = parseInt(col.substr(2, 2), 16);
                let blue = parseInt(col.substr(4, 2), 16);

                //console.log(green);
                console.log("18-5");
                red -= 40
                green -= 35;
                blue += 40;
                newHex = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
            }
            color = newHex;
            arcHours.fill(color);
            arcMinutes.fill(color);
            arcSeconds.fill(color);
        }

        //FUNCION ENCARGADA DE VERIFICAR SI LA HORA HA CAMBIADO
        function checkHour(hour) {
          console.log("HORA : "+ hour+"---"+tempHour);
            if (hour != tempHour) {
                return true
            }
            return false;
        }