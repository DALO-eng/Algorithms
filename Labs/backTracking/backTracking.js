function mainFunction(x1, x2) {
  return 100 * (x2 - x1 ** 2) ** 2 + (1 - x1) ** 2;
}

function gradientFunction(x1, x2) {
  return [-400 * x1 * (x2 - x1 ** 2) - 2 * (1 - x1), 200 * (x2 - x1 ** 2)];
}

function backTracking(x, f, p, alpha, rho, c) {
  while (!firstWolfeCondition(f, p, x, alpha, c)) {
    alpha *= rho;
  }
  return alpha;
}

function steepestDescent(x0) {
  let x1 = x0[0],
    x2 = x0[1],
    alpha = 1,
    gradient = gradientFunction(x1, x2);
  for (let i = 0; i < 1000; i++) {
    let p = [-gradient[0], -gradient[1]];
    alpha = backTracking([x1, x2], mainFunction, p, 1, 0.5, 0.5);
    x1 = x1 + alpha * p[0];
    x2 = x2 + alpha * p[1];
    gradient = gradientFunction(x1, x2);
    if (Math.sqrt(gradient[0] ** 2 + gradient[1] ** 2) < 0.000001) {
      console.log(`Total iterations: ${i} Alpha: ${alpha}`);
      return [x1, x2];
    }
  }
  console.log(`Total iterations: ${1000} Alpha: ${alpha}`);
  return [x1, x2];
}

console.log("Steepest descent");
console.log(steepestDescent([1.2, 1.2]));
//console.log(steepestDescent([-1.2, 1]));

function firstWolfeCondition(f, p, x, alpha, c1) {
  return (
    f(x[0] + alpha * p[0], x[1] + alpha * p[1]) <=
    f(x[0], x[1]) - c1 * alpha * (p[0] ** 2 + p[1] ** 2)
  );
}

function secondWolfeCondition(p, x, alpha, c2) {
  return (
    p[0] * gradientFunction(x[0] + alpha * p[0], x[1] + alpha * p[1])[0] +
      p[1] * gradientFunction(x[0] + alpha * p[0], x[1] + alpha * p[1])[1] >=
    c2 * (p[0] ** 2 + p[1] ** 2)
  );
}

function WolfeCondition(f, p, x, alpha, c1, c2) {
  return !(
    firstWolfeCondition(f, p, x, alpha, c1) &&
    secondWolfeCondition(p, x, alpha, c2)
  );
}

function backTrackingWolfe(x, f, p, alpha, rho, c1, c2) {
  while (WolfeCondition(f, p, x, alpha, c1, c2)) {
    alpha *= rho;
  }
  return alpha;
}

function steepestDescentWolfe(x0) {
  let x1 = x0[0],
    x2 = x0[1],
    alpha = 1,
    gradient = gradientFunction(x1, x2);
  for (let i = 0; i < 1000; i++) {
    let p = [-gradient[0], -gradient[1]];
    alpha = backTrackingWolfe([x1, x2], mainFunction, p, 1, 0.5, 0.2, 0.5);
    x1 = x1 + alpha * p[0];
    x2 = x2 + alpha * p[1];
    gradient = gradientFunction(x1, x2);
    console.log([x1, x2], mainFunction(x1, x2));
    if (Math.sqrt(gradient[0] ** 2 + gradient[1] ** 2) < 0.000001) {
      console.log(`Total iterations: ${i} Alpha: ${alpha}`);
      return [x1, x2];
    }
  }
  console.log(`Total iterations: ${1000} Alpha: ${alpha}`);
  return [x1, x2];
}

console.log("Steepest descent with Wolfe conditions");
//console.log(steepestDescentWolfe([1.2, 1.2]));

function goldsteinCondition(f, p, x, alpha, c) {
  let leftPart =
    f(x[0], x[1]) - (1 - c) * alpha * (p[0] ** 2 + p[1] ** 2) <=
    f(x[0] + alpha * p[0], x[1] + alpha * p[1]);
  return leftPart && firstWolfeCondition(f, p, x, alpha, c);
}

function backTrackingGoldstein(x, f, p, alpha, rho, c) {
  while (!goldsteinCondition(f, p, x, alpha, c)) {
    alpha *= rho;
  }
  return alpha;
}

function steepestDescentGoldstein(x0) {
  let x1 = x0[0],
    x2 = x0[1],
    alpha = 1,
    gradient = gradientFunction(x1, x2);
  for (let i = 0; i < 100000; i++) {
    let p = [-gradient[0], -gradient[1]];
    alpha = backTrackingGoldstein([x1, x2], mainFunction, p, 1, 0.5, 0.1);
    x1 = x1 + alpha * p[0];
    x2 = x2 + alpha * p[1];
    gradient = gradientFunction(x1, x2);
    if (Math.sqrt(gradient[0] ** 2 + gradient[1] ** 2) < 0.000001) {
      console.log(`Total iterations: ${i} Alpha: ${alpha}`);
      return [x1, x2];
    }
  }
  console.log(`Total iterations: ${10000} Alpha: ${alpha}`);
  return [x1, x2];
}

console.log("Steepest descent with Goldstein conditions");
console.log(steepestDescentGoldstein([1.2, 1.2]));
