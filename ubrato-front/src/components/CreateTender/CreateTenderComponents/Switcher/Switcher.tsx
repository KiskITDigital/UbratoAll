// import { FC } from "react";

// const Switcher: FC = () => {
//     return ( 
//         <div className={`${styles.switcher}`}>
//         <div onClick={() => setSwitcher('Тендер')} className={`${styles.switcher__div} ${switcher === 'Тендер' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Тендер' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Тендер</p></div>
//         {status !== 'создание тендера' && (<>
//             <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
//             <div onClick={() => setSwitcher('Отклики')} className={`${styles.switcher__div} ${switcher === 'Отклики' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Отклики' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Отклики</p><p className={`${styles.switcher__p2}`}>{2}</p></div>
//             <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
//             <div onClick={() => setSwitcher('Чат')} className={`${styles.switcher__div} ${switcher === 'Чат' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Чат' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Чат</p><p className={`${styles.switcher__p2}`}>{34}</p></div>
//             <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
//             <div onClick={() => setSwitcher('Доп. информация')} className={`${styles.switcher__div} ${switcher === 'Доп. информация' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Доп. информация' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Доп. информация</p></div>
//         </>)}
//         {
//             windowWidth > 1050 &&
//             <div className={`${styles.switcher__div} ${styles.switcher__lastdiv}`}>
//                 <img src={refreshImg} alt="refresh" />
//                 <p className={`${styles.switcher__p} ${styles.textBlack40}`}>Автосохранение черновика</p>
//             </div>
//         }
//     </div>
//      );
// }
 
// export default Switcher;