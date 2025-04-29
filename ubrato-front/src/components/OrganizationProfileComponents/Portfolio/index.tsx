import { Portfolio as PortfolioType } from "@/types/app";
import { FC, useState } from "react";
import styles from './portfolio.module.css'
import { getShorterText } from "../Description";

const Portfolio: FC<{ portfolio: PortfolioType[] }> = ({ portfolio: portfolioList }) => {
    const [isShorterTextIds, setIsShorterTextIds] = useState<string[]>(portfolioList.map(el => el.id));

    return (
        <div className={styles.container}>
            <p className={styles.title}>Портфолио</p>
            {
                portfolioList.map(portfolio => <div className={styles.portfolio} key={portfolio.id}>
                    <p className={styles.portfolioName}>{portfolio.name}</p>
                    <p className={styles.portfolioDescription}>
                        {isShorterTextIds.includes(portfolio.id) ? getShorterText(portfolio.description) : portfolio.description}
                        {
                            portfolio.description.split(' ').length > 10 &&
                            (isShorterTextIds.includes(portfolio.id) ?
                                <>... <span onClick={() => setIsShorterTextIds(prev => prev.filter(el => el !== portfolio.id))} className={styles.showMore}>Показать все</span></> :
                                <><br /><span onClick={() => setIsShorterTextIds(prev => [...prev, portfolio.id])} className={styles.showMore}>Показать меньше</span></>)
                        }
                    </p>
                    <div className={styles.portfolioImages}>
                        {
                            portfolio.links.map((link, ind) => <img className={styles.portfolioImage} key={ind} src={`https://cdn.ubrato.ru/s3${link?.replace('/files', '')}`} alt="" />)
                        }
                    </div>
                </div>)
            }
        </div>
    );
}

export default Portfolio;