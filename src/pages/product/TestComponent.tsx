import React from 'react';
import { ProductModel } from '../../models/Product';
import { ProductModel2 } from '../../models/Product';

const TestComponent = ({ data }: ProductModel2) => {
	console.log(data);
	return <div>123</div>;
};

export default TestComponent;
