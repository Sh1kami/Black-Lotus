import { Head } from 'next/document'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

interface ISeo {
	title: string
	description?: string
	image?: string
}

export const titleMerge = (title: string) => `${title} | Black-Lotus`

export const Meta: FC<PropsWithChildren<ISeo>> = ({
	title,
	description,
	image,
	children
}) => {
	const { asPath } = useRouter()
	const CurrentUrl = `${process.env.APP_URL}${asPath}`

	return (
		<>
			<Head>
				<title itemProp='headline'>{titleMerge(title)}</title>
				{description ? (
					<>
						<meta
							itemProp='description'
							name='description'
							content={description}
						/>
						<link rel='canonical' href={CurrentUrl} />
						<meta property='og:locale' content='en' />
						<meta property='og:title' content={titleMerge(title)} />
						<meta property='og:url' content={CurrentUrl} />
						<meta
							property='og:image'
							content={
								image ||
								'/black-lotus-front-end/public/images/favicon.ico'
							}
						/>
						{<meta property='og:site_name' content='Black Lotus' />}
						<meta property='og:description' content={description} />
					</>
				) : (
					<meta name='robots' content='noindex, nofollow' />
				)}
			</Head>
			{children}
		</>
	)
}
