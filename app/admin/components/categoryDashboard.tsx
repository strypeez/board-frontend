'use client'

import { useEffect, useState } from "react";
import CategoryItem from "../categories/components/categoryItem";
import Link from "next/link";
import { Category } from "@/models/categoryModel";

interface CategoryDashboardProps {
    catDashData: Category[]
    catError: string
}

export default function CategoryDashboard({catDashData, catError}: CategoryDashboardProps) {

    const [categories, setCategories] = useState<Category[]>([]);
    const [errMessage, setErrMessage] = useState<string>('');

    useEffect(() => {
        setCategories(catDashData);
        setErrMessage(catError);
    }, [catDashData, catError])

    return <div>
        <div className="admin-dashboard-header">
            <h2>Categories</h2>
            <Link href="/admin/categories">
                <p>See More</p>
            </Link>
        </div>
        <div className="admin-dashboard-body">
        {
            errMessage && <div key="error" className="admin-error">
                    {errMessage}
                </div>
        }
        {categories.map((category:any) => {
           return <CategoryItem key={category.id} category={category} />
        }).slice(0,3)}
        </div>        
    </div>
}