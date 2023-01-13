function mainFunction(x1, x2) {
  return 100 * (x2 - x1 ** 2) ** 2 + (1 - x1) ** 2;
}

function gradientFunction(x1, x2) {
  return [-400 * x1 * (x2 - x1 ** 2) - 2 * (1 - x1), 200 * (x2 - x1 ** 2)];
}

function stopCriteria(gradient) {
  return Math.sqrt(gradient[0] ** 2 + gradient[1] ** 2) < 0.000001;
}

function steepestDescent(fixedStep, x0) {
  let x1 = x0[0],
    x2 = x0[1],
    step = fixedStep,
    gradient = gradientFunction(x1, x2);
  for (let i = 0; i < 1000; i++) {
    x1 = x1 - step * gradient[0];
    x2 = x2 - step * gradient[1];
    gradient = gradientFunction(x1, x2);
    console.log(x1, x2, mainFunction(x1, x2));
    if (stopCriteria(gradient)) {
      return [x1, x2];
    }
  }
  return [x1, x2];
}

console.log("Steepest descent");
console.log(steepestDescent(0.0019, [1.2, 1.2]));
console.log(steepestDescent(0.003, [-1.2, 1]));
