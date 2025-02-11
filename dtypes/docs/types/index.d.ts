/*
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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

// TypeScript Version: 4.1

/**
* Data type kind.
*/
type Kind = 'all' | 'numeric' | 'real' | 'floating_point' | 'real_floating_point' | 'complex_floating_point' | 'integer' | 'signed_integer' | 'unsigned_integer';

/**
* Returns a list of ndarray data types.
*
* ## Notes
*
* -   When not provided a data type "kind", the function returns an array containing the following data types:
*
*     -   `binary`: binary.
*     -   `complex64`: single-precision complex floating-point numbers.
*     -   `complex128`: double-precision complex floating-point numbers.
*     -   `float32`: single-precision floating-point numbers.
*     -   `float64`: double-precision floating-point numbers.
*     -   `generic`: values of any type.
*     -   `int16`: signed 16-bit integers.
*     -   `int32`: signed 32-bit integers.
*     -   `int8`: signed 8-bit integers.
*     -   `uint16`: unsigned 16-bit integers.
*     -   `uint32`: unsigned 32-bit integers.
*     -   `uint8`: unsigned 8-bit integers.
*     -   `uint8c`: unsigned clamped 8-bit integers.
*
* @param kind - data type kind
* @returns list of ndarray data types
*
* @example
* var list = dtypes();
* // returns [...]
*
* @example
* var list = dtypes( 'floating_point' );
* // returns [...]
*/
declare function dtypes( kind?: Kind ): Array<string>;


// EXPORTS //

export = dtypes;
