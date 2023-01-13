x = zeros(64);
gradient = 2*H.' * (H*x-y);

for i = 1:1000
    x = x - 0.001*gradient;
    gradient = 2*H.' * (H*x-y);
end
imagesc(x)
