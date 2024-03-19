import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const storageData = JSON.parse(String(localStorage.getItem('params')));
	const [params, setParams] = useState({
		fontFamilyOption: storageData
			? storageData.fontFamilyOption
			: defaultArticleState.fontFamilyOption,
		fontSizeOption: storageData
			? storageData.fontSizeOption
			: defaultArticleState.fontSizeOption,
		fontColor: storageData
			? storageData.fontColor
			: defaultArticleState.fontColor,
		backgroundColor: storageData
			? storageData.backgroundColor
			: defaultArticleState.backgroundColor,
		contentWidth: storageData
			? storageData.contentWidth
			: defaultArticleState.contentWidth,
	});
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': params.fontFamilyOption.value,
					'--font-size': params.fontSizeOption.value,
					'--font-color': params.fontColor.value,
					'--container-width': params.contentWidth.value,
					'--bg-color': params.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isArticleParams={params}
				setArticleParams={setParams}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
