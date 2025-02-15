import React from 'react'

interface PageHeaderTitleProps {
    pgIcon: string;
    pgTitle: string;
  }

const PageHeaderTitle : React.FC<PageHeaderTitleProps> = ({pgIcon, pgTitle}) => {
    return (
        <div className="ttl">
            <h1><i className={pgIcon}></i> {pgTitle}</h1>
        </div>
    )
}

export default PageHeaderTitle