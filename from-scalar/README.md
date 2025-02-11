<!--

@license Apache-2.0

Copyright (c) 2022 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# scalar2ndarray

> Convert a scalar value to a zero-dimensional [ndarray][@stdlib/ndarray/ctor].

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="usage">

## Usage

```javascript
var scalar2ndarray = require( '@stdlib/ndarray/from-scalar' );
```

#### scalar2ndarray( value\[, options] )

Returns a zero-dimensional [`ndarray`][@stdlib/ndarray/ctor] containing a provided scalar `value`.

```javascript
var x = scalar2ndarray( 1.0 );
// returns <ndarray>

var sh = x.shape;
// returns []

var dt = x.dtype;
// returns 'float64'

var v = x.get();
// returns 1.0
```

The function accepts the following `options`:

-   **dtype**: output array [data type][@stdlib/ndarray/dtypes].
-   **order**: array order (i.e., memory layout), which is either `row-major` (C-style) or `column-major` (Fortran-style). Default: `'row-major'`.
-   **readonly**: `boolean` indicating whether an array should be **read-only**. Default: `false`.

If a `dtype` option is not provided and `value`

-   is a `number`, the default [data type][@stdlib/ndarray/dtypes] is `'float64'`.
-   is a complex number object, the default [data type][@stdlib/ndarray/dtypes] is `'complex128'`.
-   is any other value type, the default [data type][@stdlib/ndarray/dtypes] is `'generic'`.

To explicitly specify the [data type][@stdlib/ndarray/dtypes] of the returned [`ndarray`][@stdlib/ndarray/ctor], provide a `dtype` option.

```javascript
var x = scalar2ndarray( 1.0, {
    'dtype': 'float32'
});
// returns <ndarray>

var sh = x.shape;
// returns []

var dt = x.dtype;
// returns 'float32'

var v = x.get();
// returns 1.0
```

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   If `value` is a number and `options.dtype` is a complex [data type][@stdlib/ndarray/dtypes], the function returns a zero-dimensional [`ndarray`][@stdlib/ndarray/ctor] containing a complex number whose real component equals the provided scalar `value` and whose imaginary component is zero.

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var dtypes = require( '@stdlib/ndarray/dtypes' );
var scalar2ndarray = require( '@stdlib/ndarray/from-scalar' );

// Get a list of data types:
var dt = dtypes();

// Generate zero-dimensional arrays...
var x;
var i;
for ( i = 0; i < dt.length; i++ ) {
    x = scalar2ndarray( i, {
        'dtype': dt[ i ]
    });
    console.log( x.get() );
}
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/ndarray/array`][@stdlib/ndarray/array]</span><span class="delimiter">: </span><span class="description">multidimensional arrays.</span>
-   <span class="package-name">[`@stdlib/ndarray/ctor`][@stdlib/ndarray/ctor]</span><span class="delimiter">: </span><span class="description">multidimensional array constructor.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray/tree/main/ctor

[@stdlib/ndarray/dtypes]: https://github.com/stdlib-js/ndarray/tree/main/dtypes

<!-- <related-links> -->

[@stdlib/ndarray/array]: https://github.com/stdlib-js/ndarray/tree/main/array

<!-- </related-links> -->

</section>

<!-- /.links -->
