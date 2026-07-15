export function attachP5Analysis(container, media) {
  container.replaceChildren();

  const description = document.createElement('p');
  description.className = 'analysis-description';
  description.textContent = media.analysis_layer?.accessible_alternative || 'No textual analysis description is available.';
  container.appendChild(description);

  if (typeof window.p5 !== 'function') {
    const unavailable = document.createElement('p');
    unavailable.className = 'quiet';
    unavailable.textContent = 'The optional p5 analysis library is unavailable. The original semantic media remains above.';
    container.appendChild(unavailable);
    return () => {};
  }

  const canvasHost = document.createElement('div');
  canvasHost.className = 'p5-analysis-canvas';
  container.appendChild(canvasHost);

  const sketch = p => {
    let sourceImage;

    p.preload = () => {
      sourceImage = p.loadImage(media.src, undefined, () => {
        sourceImage = null;
      });
    };

    p.setup = () => {
      const width = Math.min(960, Math.max(320, canvasHost.clientWidth || 640));
      const ratio = sourceImage?.width && sourceImage?.height ? sourceImage.height / sourceImage.width : 9 / 16;
      const canvas = p.createCanvas(width, Math.round(width * ratio));
      canvas.parent(canvasHost);
      p.noLoop();
      canvas.elt.setAttribute('role', 'img');
      canvas.elt.setAttribute('aria-label', media.analysis_layer?.accessible_alternative || 'Annotated analysis rendering.');
    };

    p.draw = () => {
      p.background(20);
      if (sourceImage) p.image(sourceImage, 0, 0, p.width, p.height);
      const annotations = Array.isArray(media.analysis_layer?.annotations) ? media.analysis_layer.annotations : [];
      p.noFill();
      p.stroke(255);
      p.strokeWeight(3);
      p.textSize(14);
      p.textFont('sans-serif');
      annotations.forEach(annotation => {
        const x = Number(annotation.x || 0) * p.width;
        const y = Number(annotation.y || 0) * p.height;
        const w = Number(annotation.width || 0.1) * p.width;
        const h = Number(annotation.height || 0.1) * p.height;
        if (annotation.shape === 'ellipse') p.ellipse(x, y, w, h);
        else p.rect(x - w / 2, y - h / 2, w, h);
        p.noStroke();
        p.fill(255);
        p.text(annotation.label || 'Annotation', Math.max(8, x - w / 2), Math.max(20, y - h / 2 - 8));
        p.noFill();
        p.stroke(255);
      });
    };
  };

  const instance = new window.p5(sketch, canvasHost);
  return () => instance.remove();
}
