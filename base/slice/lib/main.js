/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var normalizeMultiSlice = require( '@stdlib/slice/base/normalize-multi-slice' );
var nonreducedDimensions = require( '@stdlib/slice/base/nonreduced-dimensions' );
var sliceShape = require( '@stdlib/slice/base/shape' );
var take = require( '@stdlib/array/base/take' );
var zeros = require( '@stdlib/array/base/zeros' );
var numel = require( './../../../base/numel' );
var getDType = require( './../../../base/dtype' );
var getShape = require( './../../../base/shape' );
var getStrides = require( './../../../base/strides' );
var getOffset = require( './../../../base/offset' );
var getOrder = require( './../../../base/order' );
var getData = require( './../../../base/data-buffer' );
var format = require( '@stdlib/string/format' );
var sliceStart = require( './slice_start.js' );
var slice2strides = require( './slice_strides.js' );
var empty = require( './empty.js' );


// MAIN //

/**
* Returns a view of an input ndarray.
*
* @param {ndarray} x - input array
* @param {MultiSlice} s - multi-slice object
* @param {boolean} strict - boolean indicating whether to enforce strict bounds checking
* @param {boolean} writable - boolean indicating whether a returned array should be writable
* @throws {RangeError} number of slice dimensions must match the number of array dimensions
* @throws {RangeError} slice exceeds array bounds
* @returns {ndarray} ndarray view
*
* @example
* var Slice = require( '@stdlib/slice/ctor' );
* var MultiSlice = require( '@stdlib/slice/multi' );
* var ndarray = require( '@stdlib/ndarray/ctor' );
* var ndarray2array = require( '@stdlib/ndarray/to-array' );
*
* var buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ];
* var shape = [ 3, 2 ];
* var strides = [ 2, 1 ];
* var offset = 0;
*
* var x = ndarray( 'generic', buffer, shape, strides, offset, 'row-major' );
* // returns <ndarray>
*
* var sh = x.shape;
* // returns [ 3, 2 ]
*
* var arr = ndarray2array( x );
* // returns [ [ 1.0, 2.0 ], [ 3.0, 4.0 ], [ 5.0, 6.0 ] ]
*
* var s = new MultiSlice( new Slice( null, null, -2 ), new Slice( null, null, -1 ) );
* // returns <MultiSlice>
*
* var y = slice( x, s, false, false );
* // returns <ndarray>
*
* sh = y.shape;
* // returns [ 2, 2 ]
*
* arr = ndarray2array( y );
* // returns [ [ 6.0, 5.0 ], [ 2.0, 1.0 ] ]
*/
function slice( x, s, strict, writable ) {
	var strides;
	var offset;
	var dtype;
	var shape;
	var order;
	var sdims;
	var ndims;
	var ctor;
	var sh;
	var ns;

	// Retrieve array meta data:
	dtype = getDType( x );
	shape = getShape( x, true );
	strides = getStrides( x, true );
	offset = getOffset( x );
	order = getOrder( x );
	ndims = shape.length;

	// Ensure that the number of array dimensions matches the number of slices:
	if ( s.ndims !== ndims ) {
		throw new RangeError( format( 'invalid argument. Number of slice dimensions does not match the number of array dimensions. Array shape: (%s). Slice dimensions: %u.', shape.join( ',' ), s.ndims ) );
	}
	// Resolve the output array constructor:
	ctor = x.constructor;

	// If provided a zero-dimensional input array, return a zero-dimensional array view...
	if ( ndims === 0 ) {
		return new ctor( dtype, getData( x ), shape, strides, offset, order, {
			'readonly': !writable
		});
	}
	// Resolve the indices of the non-reduced dimensions:
	sdims = nonreducedDimensions( s );

	// Normalize the slice object based on the array shape:
	ns = normalizeMultiSlice( s, shape, true );

	// Check whether the slice exceeds array bounds...
	if ( ns.code ) {
		if ( strict ) {
			throw new RangeError( format( 'invalid argument. Slice exceeds array bounds. Array shape: (%s).', shape.join( ',' ) ) );
		}
		// Normalize again, this time allowing for out-of-bounds indices:
		ns = normalizeMultiSlice( s, shape, false );

		// Compute the slice shape:
		sh = sliceShape( ns );

		// If the non-reduced dimensions contain elements, this means that at least one reduced dimension exceeded array bounds; in which case, we generate a shape containing zeros:
		if ( numel( take( sh, sdims ) ) > 0 ) {
			sh = zeros( sh.length );
		}
	} else {
		// Compute the slice shape:
		sh = sliceShape( ns );
	}
	// If the slice does not contain any elements, return an empty array...
	if ( numel( sh ) === 0 ) {
		return empty( ctor, dtype, take( sh, sdims ), order, !writable );
	}
	// Resolve the index offset of the first element indexed by the slice:
	offset = sliceStart( ns, strides, offset ); // TODO: @stdlib/ndarray/base/sind2bind

	// Remove reduced dimensions from the slice shape:
	sh = take( sh, sdims );

	// If all dimensions were reduced, return a zero-dimensional array...
	if ( sh.length === 0 ) {
		return new ctor( dtype, getData( x ), [], [ 0 ], offset, order, {
			'readonly': !writable
		});
	}
	// Update strides according to slice steps:
	strides = slice2strides( ns, strides, sdims ); // TODO: @stdlib/ndarray/base/slice2strides???

	// Return a slice view:
	return new ctor( dtype, getData( x ), sh, strides, offset, order, {
		'readonly': !writable
	});
}


// EXPORTS //

module.exports = slice;
