import React, { useState } from 'react'

function New(props: { children: React.ReactNode }) {
	return (
		<div className='wrap-item wrap-item-new'>
			<span className='label'>New!</span>
			{props.children}
		</div>
	)
}

function Popular(props: { children: React.ReactNode }) {
	return (
		<div className='wrap-item wrap-item-popular'>
			<span className='label'>Popular!</span>
			{props.children}
		</div>
	)
}

interface WithViews {
	views: number
}

function withPopularOrNew<T extends WithViews>(
	Component: React.ComponentType<T>
) {
	return (props: T) => {
		const { views } = props

		if (views >= 1000) {
			return <Popular>{<Component {...props} />}</Popular>
		} else if (views < 100) {
			return <New>{<Component {...props} />}</New>
		} else {
			return <Component {...props} />
		}
	}
}

const WrappedVideo = withPopularOrNew(Video)
const WrappedArticle = withPopularOrNew(Article)

interface ArticleProps {
	type: string
	title: string
	views: number
}

function Article(props: ArticleProps) {
	return (
		<div className='item item-article'>
			<h3>
				<a href='#'>{props.title}</a>
			</h3>
			<p className='views'>Прочтений: {props.views}</p>
		</div>
	)
}

interface VideoProps {
	type: string
	url: string
	views: number
}

function Video(props: VideoProps) {
	return (
		<div className='item item-video'>
			<iframe
				src={props.url}
				frameBorder='0'
				allow='autoplay; encrypted-media'
				allowFullScreen
			></iframe>
			<p className='views'>Просмотров: {props.views}</p>
		</div>
	)
}

function List(props: { list: (ArticleProps | VideoProps)[] }) {
	return props.list.map((item, index) => {
		switch (item.type) {
			case 'video':
				return <WrappedVideo key={index} {...(item as VideoProps)} />

			case 'article':
				return <WrappedArticle key={index} {...(item as ArticleProps)} />
		}
	})
}

export default function App() {
	const [list, setList] = useState([
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
			views: 50,
		},
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
			views: 12,
		},
		{
			type: 'article',
			title: 'Невероятные события в неизвестном поселке...',
			views: 175,
		},
		{
			type: 'article',
			title: 'Секретные данные были раскрыты!',
			views: 1532,
		},
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
			views: 4253,
		},
		{
			type: 'article',
			title: 'Кот Бегемот обладает невероятной...',
			views: 12,
		},
	])

	return <List list={list} />
}
