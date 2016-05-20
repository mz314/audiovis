var CanvasVisualizer = function (canvas_selector, parameters) {
    this.canvas_selector = canvas_selector;
    this.canvas = $(canvas_selector);
    this.parameters = {
        divider: 50,
        bgColor: "#aaaaaa",
        barColor: "#0000ff",
        borderSize: 1,
        borderColor: "#ff0000",
        refreshInterval: 50,
    };


    this.parameters = $.extend(this.parameters, parameters);

};

CanvasVisualizer.prototype = new Visualizer();

CanvasVisualizer.prototype.initialize = function () {
    var cnv = this.canvas.get(0);

    this.width = this.frequency_data.length;
    this.height = this.frequency_data.length / 4;

    cnv.width = this.width;
    cnv.height = this.height;

    this.ctx = cnv.getContext("2d");
    this.ctx.restore();
    this.ctx.fillStyle = this.parameters.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);

};


CanvasVisualizer.prototype.drawBar = function (x, y, w, h, c) {

    this.ctx.fillStyle = this.parameters.bgColor;
    this.ctx.fillRect(x, 0, w + this.parameters.borderSize, this.height);

    if (h === 0) {
        return;
    }


    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, w, h);


    this.ctx.strokeStyle = this.parameters.borderColor;
    this.ctx.lineWidth = this.parameters.borderSize;
    this.ctx.strokeRect(x, y, w, h);

};

CanvasVisualizer.prototype.drawFreqBars = function (frequency_data) {

    var
            w = Math.floor(this.width / (frequency_data.length / this.parameters.divider)),
            x = 0;

    for (var i in frequency_data) {
        if (i % this.parameters.divider !== 0) {
            continue;
        }
        h = frequency_data[i];


        this.drawBar(x, this.height - h, w, h, this.parameters.barColor);
        x += w + this.parameters.borderSize;
    }

};

CanvasVisualizer.prototype.start = function () {
    var self = this;
    setInterval(function () {
        self.analyser.getByteFrequencyData(self.frequency_data);
        self.drawFreqBars(self.frequency_data);
    }, this.parameters.refreshInterval);
}; 