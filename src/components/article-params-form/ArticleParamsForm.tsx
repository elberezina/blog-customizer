import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../../components/radio-group';
import { Separator } from '../../components/separator';
import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent, useRef } from 'react';
import { clsx } from 'clsx';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	contentWidthArr,
	fontSizeOptions,
	backgroundColors,
} from '../../constants/articleProps';
import { useOutsideClickClose } from '../../components/select/hooks/useOutsideClickClose';
import { useLocalStorage } from '../../components/select/hooks/useLocalStorage';

type ArticleParamsProps = {
	isArticleParams: ArticleStateType;
	setArticleParams: (options: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	isArticleParams,
	setArticleParams,
}: ArticleParamsProps) => {
	const [isArticleOpen, setIsArticleOpen] = useState(false);
	const handleArrowButtonClick = () => {
		setIsArticleOpen(!isArticleOpen);
	};
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isArticleOpen,
		rootRef,
		onClose: handleArrowButtonClick,
		onChange: setIsArticleOpen,
	});

	const [value, setValue] = useLocalStorage<ArticleStateType>(
		'params',
		isArticleParams
	);

	const submitFormChanges = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleParams({
			fontFamilyOption: value.fontFamilyOption,
			fontSizeOption: value.fontSizeOption,
			fontColor: value.fontColor,
			backgroundColor: value.backgroundColor,
			contentWidth: value.contentWidth,
		});
	};

	const resetFormChanges = () => {
		setValue(defaultArticleState);
		setArticleParams({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	};

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isArticleOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isArticleOpen} onClick={handleArrowButtonClick} />
			<aside className={asideStyle} ref={rootRef}>
				<form className={styles.form} onSubmit={submitFormChanges}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						onChange={(e) => setValue({ ...value, fontFamilyOption: e })}
						selected={value.fontFamilyOption}
						title='шрифт'
					/>
					<RadioGroup
						name='рАЗМЕР шрифта'
						options={fontSizeOptions}
						onChange={(e) => setValue({ ...value, fontSizeOption: e })}
						selected={value.fontSizeOption}
						title='рАЗМЕР шрифта'
					/>
					<Select
						options={fontColors}
						onChange={(e) => setValue({ ...value, fontColor: e })}
						selected={value.fontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						onChange={(e) => setValue({ ...value, backgroundColor: e })}
						selected={value.backgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						onChange={(e) => setValue({ ...value, contentWidth: e })}
						selected={value.contentWidth}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetFormChanges} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
