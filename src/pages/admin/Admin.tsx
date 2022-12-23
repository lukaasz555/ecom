import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../components/atoms/AdminNav/AdminNav';
import AdminLayout from '../../components/templates/AdminLayout/AdminLayout';

const Admin = () => {
	const [isAdmin, setAdmin] = useState(false);
	const [error, setError] = useState(false);

	const valid = (password: string) => {
		if (password === 'Test123') {
			setAdmin(true);
			setError(false);
		} else {
			setError(true);
		}
	};

	return <AdminLayout>admin panel - home</AdminLayout>;
};

export default Admin;
