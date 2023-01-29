x = zeros(64);
r = H*x-y;
p = -r;
for i = 1:10000
    alpha = (-1)*(r'*p)/(p'*H*p);
    x = x + alpha*p;
    r = H*x - y;
    beta = (r'*H*p)/(p'*H*p);
    p = -r + beta*p;
end
imagesc(x)