<!--

@license Apache-2.0

Copyright (c) 2023 The Stdlib Authors.

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

# maybeBroadcastArray

> Broadcast an [ndarray][@stdlib/ndarray/ctor] to a specified shape if and only if the specified shape differs from the provided [ndarray][@stdlib/ndarray/ctor]'s shape.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="usage">

## Usage

```javascript
var maybeBroadcastArray = require( '@stdlib/ndarray/maybe-broadcast-array' );
```

#### maybeBroadcastArray( x, shape )

Broadcasts an [ndarray][@stdlib/ndarray/ctor] to a specified `shape` if and only if the specified `shape` differs from the provided [ndarray][@stdlib/ndarray/ctor]'s shape.

```javascript
var array = require( '@stdlib/ndarray/array' );

// Create a 2x2 ndarray:
var x = array( [ [ 1, 2 ], [ 3, 4 ] ] );
// returns <ndarray>

// Broadcast to a 2x2x2 ndarray:
var y = maybeBroadcastArray( x, [ 2, 2, 2 ] );
// returns <ndarray>
```

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   The function throws an error if a provided [ndarray][@stdlib/ndarray/ctor] is [incompatible][@stdlib/ndarray/base/broadcast-shapes] with a provided shape.
-   If a provided [ndarray][@stdlib/ndarray/ctor] has the same shape as the specified shape, the function returns the provided [ndarray][@stdlib/ndarray/ctor].
-   If a provided [ndarray][@stdlib/ndarray/ctor] has a different (broadcast compatible) shape than the specified shape, the function returns a new **read-only** [ndarray][@stdlib/ndarray/ctor] view of the provided [ndarray][@stdlib/ndarray/ctor]'s data. The view is typically **not** contiguous. As more than one element of a returned view may refer to the same memory location, writing to the input [ndarray][@stdlib/ndarray/ctor] may affect multiple elements. If you need to write to the input [ndarray][@stdlib/ndarray/ctor], copy the [ndarray][@stdlib/ndarray/ctor] **before** broadcasting.

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var array = require( '@stdlib/ndarray/array' );
var numel = require( '@stdlib/ndarray/base/numel' );
var ind2sub = require( '@stdlib/ndarray/ind2sub' );
var maybeBroadcastArray = require( '@stdlib/ndarray/maybe-broadcast-array' );

// Create a 2x2 array:
var x = array( [ [ 1, 2 ], [ 3, 4 ] ] );
// returns <ndarray>

// Broadcast the array to 3x2x2:
var y = maybeBroadcastArray( x, [ 3, 2, 2 ] );
// returns <ndarray>

// Retrieve the shape:
var sh = y.shape;
// returns [ 3, 2, 2 ]

// Retrieve the number of elements:
var N = numel( sh );

// Loop through the array elements...
var i;
for ( i = 0; i < N; i++ ) {
    console.log( 'Y[%s] = %d', ind2sub( sh, i ).join( ', ' ), y.iget( i ) );
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
-   <span class="package-name">[`@stdlib/ndarray/broadcast-array`][@stdlib/ndarray/broadcast-array]</span><span class="delimiter">: </span><span class="description">broadcast an ndarray to a specified shape.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray/tree/main/ctor

[@stdlib/ndarray/base/broadcast-shapes]: https://github.com/stdlib-js/ndarray/tree/main/base/broadcast-shapes

<!-- <related-links> -->

[@stdlib/ndarray/array]: https://github.com/stdlib-js/ndarray/tree/main/array

[@stdlib/ndarray/broadcast-array]: https://github.com/stdlib-js/ndarray/tree/main/broadcast-array

<!-- </related-links> -->

</section>

<!-- /.links -->
