// In The Name Of Allah

var RootV = new Vue({
    el: "#root",
    data: {
        hand: {},
    },
});

var MainbarV = new Vue({
    el: "#mainbar",
    data: {
        operations: {
            newTiles: {
                name: "کاشی‌های جدید",
                onClick: function(){
                    NewModalV.open();
                    return;
                },
            },
            export: {
                name: "خروجی گرفتن",
                onClick: function(){
                    ExportModalV.open();
                    return;
                },
            }
        }
    },
});

var NewModalV = new Vue({
    el: "#new-modal",
    data: {
        el: "#new-modal",
        c: null,
        r: null,
        x: null,
        y: null,
        dc: null,
    },
    methods: {
        vNull: function(){
            this.c = null;
            this.r = null;
            this.x = null;
            this.y = null;
            this.dc = null;
            return;
        },
        open: function(){
            this.vNull();
            $(this.el).modal();
            return;
        },
        close: function(){
            this.vNull();
            $(this.el).modal('hide');
            return;
        },
        create: function(){
            DeskV.prepareDesk(this.c, this.r, this.x, this.y, this.dc);
            this.close();
            return;
        },
        cancel: function(){
            this.close()
            return;
        },
    },
});

var ExportModalV = new Vue({
    el: "#export-modal",
    data: {
        el: "#export-modal",
        canvasId : 'export-canvas',
    },
    methods: {
        vNull: function(){
            return;
        },
        open: function(){
            this.vNull();
            this.create();
            $(this.el).modal();
            return;
        },
        close: function(){
            this.vNull();
            $(this.el).modal('hide');
            return;
        },
        create: function(){
            var canvas = document.getElementById(this.canvasId);
            canvas.width = DeskV.width;
            canvas.height = DeskV.height;
            var ctx = canvas.getContext('2d');
            var x = 0;
            var y = 0;
            var w = 0;
            var h = 0;
            if (DeskV.tiles[0][0])
            {
                w = DeskV.tiles[0][0]['width'];
                h = DeskV.tiles[0][0]['height'];
            }
            else
                return;

            for(var row of DeskV.tiles)
            {
                for(var tile of row)
                {
                    ctx.fillStyle = tile['background-color'];
                    ctx.fillRect(x, y, w, h);
                    x += w;
                }
                x = 0;
                y += h;
            }
        },
        download: function(){
            var link = document.createElement('a');
            link.download = 'kashi.png';
            link.href = document.getElementById(this.canvasId).toDataURL()
            link.click();
            return;
        }
    }
});

var DeskV = new Vue({
    el: "#desk",
    data: {
        defaultTile: {
            'background-color': "white",
            'width': "0",
            'height': "0",
        },
        colomns: 0,
        rows: 0,
        width: 0,
        height: 0,
        tileWidth: 0,
        tileHeight: 0,
        tiles: [],
    },
    methods: {
        prepareDesk: function(c, r, x, y, dc){
            this.colomns = c;
            this.rows = r;
            this.tileWidth = x;
            this.tileHeight = y;
            this.width = c * x;
            this.height = r * y;
            this.defaultTile['width'] = x;
            this.defaultTile['height'] = y;
            this.defaultTile['background-color'] = dc;
            this.tiles = [];
            var row = new Array();
            for (var i = 0; i < this.colomns; i++)
                row.push(Object.assign({}, this.defaultTile));
            for (var i = 0; i < this.rows; i++)
                this.tiles.push(JSON.parse(JSON.stringify(row)));
            return;
        }
    }
});

var ToolboxV= new Vue({
    el: "#toolbox",
    data:{
        tools: {
            colorer: {
                name: 'رنگ‌ریز',
                color: "black",
                do: function(tile){
                    tile['background-color'] = this.color;
                    return;
                }
            }
        }
    }
})

//RootV.prepareDesk();