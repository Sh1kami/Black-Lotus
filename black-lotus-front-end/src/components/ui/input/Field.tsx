import cn from 'clsx'
import { forwardRef } from 'react'
import { IField } from './field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, error, className, type = 'text', style, Icon, ...rest },
		ref
	) => {
		return (
			<div className={cn('mb-4', className)} style={style}>
				<label>
					<span className='mb-1 block'>
						{Icon && <Icon className='mr-3' />}
						{placeholder}
					</span>
					<input
						ref={ref}
						type={type}
						placeholder={placeholder}
						className={cn(
							'bg-white px-4 py-2 w-full outline-none border border-solid border-secondary_text focus:border-black transition-all placeholder:secondary rounded-lg',
							{
								'border-red': error
							}
						)}
						{...rest}
					/>
				</label>
				{error && <div className='text-red mt-1'>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
