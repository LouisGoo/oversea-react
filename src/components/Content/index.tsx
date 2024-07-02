import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import styles from './index.module.css';
interface ContentProps extends PropsWithChildren {
    title: string,
    operation?: ReactNode
}
const Content:React.FC<ContentProps>=({children, title, operation})=> {
    return <div>
        <div className={styles.title}>
            {title}
            {operation && <span className={styles.btn}>{operation}</span>}
        </div>
        <div className={styles.content}>{children}</div>
    </div>
}

export default Content;