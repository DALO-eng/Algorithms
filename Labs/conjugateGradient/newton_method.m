x = zeros(64);
inverse = inv(H'*H);

for i = 1:1000
    gradient = 2*H.' * (H*x-y);
    x = x - 0.001.*(inverse)*gradient;
end
imagesc(x)