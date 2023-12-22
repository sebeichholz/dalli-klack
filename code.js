var timer = 1000;
var diff = 50;

function fadeOutRandomHexagon() {
    var els = document.getElementsByClassName("nothidden");
    var num = Math.floor(Math.random() * els.length)
    fadeOut(els[num]);
    els[num].classList.add("hidden");
    els[num].classList.remove("nothidden");
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}

function fadeOut(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= 0.1;
    }, 50);
}

const App = {
    data() {
        return {
            debug: false,
            cols: 30,
            rows: 30,
            myfontSize: 10,
            count: 0,
            image: "bild1.jpg",
            timeout: 1000,
            status: "pause",
        }
    },
    created() {
        var vm = this;
        getTimeout = function() {
            return this.timeout;
        };
        intervall = function() {
            if (vm.debug) {
                console.log("intervall-prüfung. status=" + vm.status + ", vm.timeout=" + vm.timeout + ", timer: " + timer)
            };
            if (vm.status == "play") {
                fadeOutRandomHexagon();
            }
            window.setTimeout(intervall, timer);
        };
        //window.setInterval(intervall, vm.timeout);
        intervall();

        window.addEventListener('keydown', (action) => {
            console.log("action.key = " + action.key);

            if (this.debug) { console.log("x: " + action.key) };
            if (action.key == "h") { //H
                window.location = "?"
            }
            else if (action.key == "r") { //R
                fadeOutRandomHexagon();
            } else if (action.key == "p") { //P
                if (vm.status == "play") {
                    vm.status = "pause";
                } else {
                    vm.status = "play";
                }
            } else if (action.key == " ") {
                //alert("Leertaste wurde gedrückt");
                vm.status = "pause";
                var els = document.getElementsByClassName("c1");
                Array.prototype.forEach.call(els, function(element) {
                    fadeOut(element);
                });
            } else if (action.key == "+") {
                vm.timeout = vm.timeout + diff;
                timer = timer + diff;
                //window.setTimeout(intervall, vm.timeout);
            } else if (action.key == "-") {
                vm.timeout = vm.timeout - diff;
                timer = timer - diff;
                //window.setTimeout(intervall, vm.timeout);
            } else if (action.key == "q") {
                clearCookies();
            } else if (action.key == "Enter") {
                reloadPageWithSelectedImage();
            } else if (action.key == "ArrowRight") {
                toggle(document.getElementById("imagelist"));
                //toggle(document.getElementById("debug"));

            }

        });

    },
    mounted() {
        if (getURLParameter('debug') == 'true') {
            this.debug = true;
        }

        window.addEventListener("load", function(event) {
            var img1 = getURLParameter('image');
            if (img1 != null) {
                div = document.getElementById("imagediv");
                var elem = document.createElement("img");
                elem.setAttribute("src", "images/" + img1);
                elem.setAttribute("id", "pic");
                elem.setAttribute("class", "center-fit");
                div.append(elem);
                document.getElementById("pic").addEventListener("load", function() {

                    Cookies.set('pix', Cookies.get('pix') + " " + img1, { expires: 7 });

                    var picRect = document.getElementById("pic").getBoundingClientRect();

                    document.getElementById("borderRight").style.left = (picRect.right) + 'px';
                    document.getElementById("borderRight").style.display = 'inline';

                    document.getElementById("borderBottom").style.top = (picRect.bottom) + 'px';
                    document.getElementById("borderBottom").style.display = 'inline';

                    fadeOut(document.getElementById("full"));

                    var els = document.getElementsByClassName("c1");
                    var diff = 150;
                    Array.prototype.forEach.call(els, function(element) {
                        var rect = element.getBoundingClientRect();
                        if (rect.left > picRect.right ||
                            rect.top > picRect.bottom) {
                            //fadeOut(element);
                            element.style.display = "none";
                            element.classList.add("hidden");
                        } else {
                            element.classList.add("nothidden");

                            if (rect.right < (picRect.left + diff)) {
                                //element.classList.remove("nothidden");
                                //element.style.opacity = 0.7; 
                                /*
                                element.classList.add("hidden");
                                var children = element.querySelectorAll('text');
                                Array.prototype.forEach.call(children, function(c) {
                                    //console.log(c);
                                    c.style.display = 'none';
                                    
                                });
                                */
                            }


                        }


                    });
                });

            }
        });
    },
    methods: {
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getRandomColor2() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 3; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getLeft(x, y) {
            factor = this.myfontSize * 11.9;
            result = factor * (x - 1);
            //every second row:
            if (y % 2 == 1) {
                result = result - (factor * 0.5);
            }
            result = result - (20); //begin left enough
            return result;
        },
        getTop(y) {
            factor = (this.myfontSize * 10.3);
            result = factor * (y - 1);
            result = result - 120;
            return result;
        },


    }
}

const app = Vue.createApp(App)

// Define a new global component called button-counter
app.component('svg-hexagon', {
    data() {
        return {
            number: Math.floor(Math.random() * 11),
            number2: this.getNextNumber(),
            showNumbers: false,
        }
    },
    events: {},
    methods: {
        getNextNumber: function() {
            this.$parent.count = this.$parent.count + 1;
            return this.$parent.count; //Math.floor(Math.random() * 111)  
        },
    },
    props: [],
    template: '\
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="150" height="140" viewbox="0 0 173.20508075688772 200" \
        \
    >\
    <g transform="scale(0.46)" color="green">\
        <polygon transform="rotate(90, 150,150)" \
            pointer-events="visiblePainted"\
            points="300,150 225,280 75,280 0,150 75,20 225,20"\
            fill="white" stroke="black" stroke-width="2px" ></polygon>\
        <text v-if="showNumbers" x="140" y="170" font-family="Verdana" font-size="50" text-anchor="middle"\
        >{{number2}}</text> \
    </g>  \
    </svg>  \
    '
})

app.mount("#hello-vue");

var select = document.getElementById("select");
select.setAttribute("size", 40);

for (var i = 0; i < imagelist.length; i++) {
    console.log(imagelist[i]);
    var c = Cookies.get("pix");
    var option = document.createElement("OPTION");
    var selected = false;
    txt = document.createTextNode(imagelist[i]);
    //console.log(txt);
    if (getURLParameter("image") == txt.nodeValue) {
        selected = true;
        option.setAttribute("selected", selected);
    }
    if ((c + "").includes(imagelist[i]) || selected) {
        option.setAttribute("class", "pic_old")
    }
    option.appendChild(txt);
    option.setAttribute("value", imagelist[i]);
    select.insertBefore(option, select.lastChild);
}


reloadPageWithSelectedImage = function() {
    url = "?image=" + document.getElementById("select").value;
    window.location.href = url;
}

clearCookies = function() {
    console.log("deleting cookie");
    Cookies.remove('pix');
}

toggle = function(x) {
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}