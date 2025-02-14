import React from 'react'
import style from "./Home.module.css"
import RecentProducts from './../RecentProducts/RecentProducts';
import PopularCategories from '../PopularCategories/PopularCategories';
import ImgSilder from '../ImgSilder/ImgSilder';
import Footer from './../Footer/Footer';


export default function Home() {
  
  return <>
  <ImgSilder/>
  <PopularCategories/>
  <RecentProducts/>
  </>
}
