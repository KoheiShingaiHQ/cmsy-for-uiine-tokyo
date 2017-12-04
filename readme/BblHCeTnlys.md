# Population Mean
## Symbol
The **population mean** symbol is `μ`.

## Formula
### ■ Image
![population-mean-1](https://wikimedia.org/api/rest_v1/media/math/render/svg/8913af7aa798971f4ebbbae206b18a996536b4d5)

### ■ Text
```
μ = ( Σ * X ) / N
```

### ■ MathJax or LaTeX
```
\displaystyle \mu = \frac{ 1 }{ n } \sum_{ i = 1 }^{ n } x_i
```

### ■ R
```R
> library(MASS)  # load the MASS package 
> height.survey = survey$Height
> mean(height.survey, na.rm=TRUE) # skip missing values
[1] 172.38
```

## Definition
The **population mean** is an **average** of a group characteristic.  

> For example :  
> - In a school of `1,013` students, the **average** GPA is `3.1`.
> - Dogs seen in a certain veterinary practice weigh, on **average**, `38` pounds.
> - Books in one school’s public library are checked out `7` times per year, on **average**.

In **statistics**, it’s actually rare that you can calculate the **population mean**.  
That’s because asking an **entire population** about something is usually cost prohibitive or too time consuming.

![population-mean-2](http://www.statisticshowto.com/wp-content/uploads/2009/09/normaldistlessthan4.jpg)
A normal distribution curve showing a mean of 15.
