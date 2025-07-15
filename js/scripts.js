document.addEventListener("DOMContentLoaded", function() {
    const donutCanvas = document.getElementById('donutChart');
    if (donutCanvas && donutCanvas.getContext) {
        const ctx = donutCanvas.getContext('2d');
        // Data: Anak Kucing, Dewasa, Tua
        const data = [42, 38, 20];
        const colors = ['#ffa200', '#ffc28f', '#fbbf24'];
        const total = data.reduce((a, b) => a + b, 0);
        let startAngle = -0.5 * Math.PI;
        for (let i = 0; i < data.length; i++) {
            const sliceAngle = (data[i] / total) * 2 * Math.PI;
            ctx.beginPath();
            ctx.moveTo(70, 70);
            ctx.arc(70, 70, 60, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
            startAngle += sliceAngle;
        }
        // Draw donut hole
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(70, 70, 35, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    }
});