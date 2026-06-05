async function trainModels() {
  const X = [1, 2, 3, 4, 5];
  const y = [100, 200, 300, 400, 500];

  const predictions = X.map(v => v * 100);

  return {
    success: true,
    data: {
      X,
      y,
      predictions
    }
  };
}

module.exports = { trainModels };