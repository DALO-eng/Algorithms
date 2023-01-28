function getHilbertMatrix(dimensions) {
  let matrix = [];
  for (let i = 0; i < dimensions; i++) {
    matrix.push([]);
    for (let j = 0; j < dimensions; j++) {
      matrix[i][j] = 1 / (i + 1 + (j + 1) - 1);
    }
  }
  return matrix;
}

function norm(array) {
  return Math.sqrt(array.map((x) => x * x).reduce((a, b) => a + b));
}

function multiplyMatrixVector(A, x) {
  let result = [];
  for (let i = 0; i < A.length; i++) {
    result.push(0);
    for (let j = 0; j < x.length; j++) {
      result[i] += A[i][j] * x[j];
    }
  }
  return result;
}

function subtractVectors(a, b) {
  let result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] - b[i];
  }
  return result;
}

function dot(a, b) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }
  return result;
}

function addVectors(a, b) {
  let result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] + b[i];
  }
  return result;
}

function multiplyVectorEscalar(a, v) {
  let result = [];
  for (let i = 0; i < v.length; i++) {
    result[i] = a * v[i];
  }
  return result;
}

function linearConjugateGradient(n) {
  let A = getHilbertMatrix(n),
    b = [],
    x = [],
    iters = 0;
  for (let i = 0; i < n; i++) b[i] = 1;
  for (let i = 0; i < n; i++) x[i] = 0;
  let r = subtractVectors(multiplyMatrixVector(A, x), b),
    p = r.map((x) => x * -1);
  while (norm(r) > 0.000001) {
    let Ap = multiplyMatrixVector(A, p);
    let alpha = -1 * (dot(r, p) / dot(p, Ap));
    x = addVectors(x, multiplyVectorEscalar(alpha, p));
    r = subtractVectors(multiplyMatrixVector(A, x), b);
    let beta = dot(r, Ap) / dot(p, Ap);
    p = addVectors(
      r.map((x) => x * -1),
      multiplyVectorEscalar(beta, p)
    );
    iters = iters + 1;
  }
  return [iters, x];
}

let dimensions = [5, 8, 10];

for (let dimension of dimensions) {
  let result = linearConjugateGradient(dimension);
  console.log(`Dimension: ${dimension}
  Iteraciones: ${result[0]}
  X: ${result[1]}`);
}
