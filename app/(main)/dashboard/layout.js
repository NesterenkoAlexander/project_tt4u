import React, { Suspense } from 'react'
import DashboardPage from './page';
import { BarLoader } from 'react-spinners'

const DashboardLayout = () => {
    return (
    <div className='px-5 pt-12'>
            <h1 className='text-6xl font-bold gradient-title mb-5'>Панель Управления</h1>

        {/* Dashboard Page */}
        <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#4511a8" />}>
            <DashboardPage />
        </Suspense>
    </div>
    );
};

export default DashboardLayout;