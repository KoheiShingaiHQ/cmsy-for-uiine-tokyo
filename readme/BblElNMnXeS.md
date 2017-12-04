# Population Variance
## Formula
### ■ Image
![population-variance-1](https://wikimedia.org/api/rest_v1/media/math/render/svg/3b77e37fa3e4c9656b6e3e5d34cf7cd804dcec81)

### ■ Text
```
σ^2 = ( Σ * ( X - μ )^2 ) / N
```

### ■ MathJax or LaTeX
```
\displaystyle \sigma = \frac{ 1 }{ n } \sum_{ i = 1}^{ n } ( x_i - μ )^2
```

### ■ R
```R
pop.var <- function(x) var(x) * (length(x)-1) / length(x)
```

## Definition
**Population variance** tells us how data points in a specific population are spread out.  
It is the **average** of the distances from each data point in the **population** to the **mean**, squared.
