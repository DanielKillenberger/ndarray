/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var tape = require( 'tape' );
var array = require( './../../../array' );
var ndarray = require( './../../../base/ctor' );
var isReadOnly = require( './../../../base/assert/is-read-only' );
var prependSingletonDimensions = require( './../lib' ); // eslint-disable-line id-length


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof prependSingletonDimensions, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function prepends singleton dimensions', function test( t ) {
	var x;
	var y;

	x = array( [ [ 1, 2 ], [ 3, 4 ] ] );

	y = prependSingletonDimensions( x, 3 );

	t.notEqual( y, x, 'returns expected value' );
	t.deepEqual( y.shape, [ 1, 1, 1, 2, 2 ], 'returns expected value' );
	t.strictEqual( y.data, x.data, 'returns expected value' );

	t.end();
});

tape( 'the function prepends singleton dimensions (base; row-major)', function test( t ) {
	var x;
	var y;

	x = ndarray( 'generic', [ 1, 2, 3, 4 ], [ 2, 1, 2 ], [ 2, 2, 1 ], 0, 'row-major' );
	y = prependSingletonDimensions( x, 3 );

	t.notEqual( y, x, 'returns expected value' );
	t.deepEqual( y.shape, [ 1, 1, 1, 2, 1, 2 ], 'returns expected value' );
	t.deepEqual( y.strides, [ 2, 2, 2, 2, 2, 1 ], 'returns expected value' );
	t.strictEqual( y.data, x.data, 'returns expected value' );

	t.end();
});

tape( 'the function prepends singleton dimensions (base; column-major)', function test( t ) {
	var x;
	var y;

	x = ndarray( 'generic', [ 1, 2, 3, 4 ], [ 2, 1, 2 ], [ 1, 2, 2 ], 0, 'column-major' );
	y = prependSingletonDimensions( x, 3 );

	t.notEqual( y, x, 'returns expected value' );
	t.deepEqual( y.shape, [ 1, 1, 1, 2, 1, 2 ], 'returns expected value' );
	t.deepEqual( y.strides, [ 1, 1, 1, 1, 2, 2 ], 'returns expected value' );
	t.strictEqual( y.data, x.data, 'returns expected value' );

	t.end();
});

tape( 'if provided a read-only array, the function returns a read-only array', function test( t ) {
	var x;
	var y;

	x = array( [ 1, 2, 3, 4 ], {
		'shape': [ 2, 1, 2 ],
		'readonly': true
	});

	y = prependSingletonDimensions( x, 2 );

	t.notEqual( y, x, 'returns expected value' );
	t.deepEqual( y.shape, [ 1, 1, 2, 1, 2 ], 'returns expected value' );
	t.strictEqual( y.data, x.data, 'returns expected value' );
	t.strictEqual( isReadOnly( y ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided a writable array, the function returns a writable array', function test( t ) {
	var x;
	var y;

	x = array( [ 1, 2, 3, 4 ], {
		'shape': [ 2, 1, 2 ],
		'readonly': false
	});

	y = prependSingletonDimensions( x, 1 );

	t.notEqual( y, x, 'returns expected value' );
	t.deepEqual( y.shape, [ 1, 2, 1, 2 ], 'returns expected value' );
	t.strictEqual( y.data, x.data, 'returns expected value' );
	t.strictEqual( isReadOnly( y ), false, 'returns expected value' );

	t.end();
});

tape( 'if provided a writable array, the function returns a writable array (base)', function test( t ) {
	var x;
	var y;

	x = ndarray( 'generic', [ 1, 2, 3, 4 ], [ 2, 1, 2 ], [ 2, 2, 1 ], 0, 'row-major' );
	y = prependSingletonDimensions( x, 4 );

	t.notEqual( y, x, 'returns expected value' );
	t.deepEqual( y.shape, [ 1, 1, 1, 1, 2, 1, 2 ], 'returns expected value' );
	t.strictEqual( y.data, x.data, 'returns expected value' );
	t.strictEqual( isReadOnly( y ), false, 'returns expected value' );

	t.end();
});
