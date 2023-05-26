const BurgerIcon = document.querySelector('.hamburger-icon')
const DropDown = document.querySelector('.dropdown')

const LinkInput = document.querySelector('#link')
const SubmitBtn = document.querySelector('.ShortenBtn')

const ShorterLinks = document.querySelector('.main-shorter-links')

const Items = []

const FetchData = Link => {
	fetch(`https://api.shrtco.de/v2/shorten?url=${Link}`, {
		method: 'GET',
	})
		.then(res => res.json())
		.then(data => {
			const linkDiv = document.createElement('div')
			linkDiv.classList.add('main-shorter-links-link')
			const texts = document.createElement('div')
			texts.classList.add('main-shorter-links-link-texts')
			const name = document.createElement('p')
			name.classList.add('main-shorter-links-link-texts-name')
			const link = document.createElement('p')
			link.classList.add('main-shorter-links-link-texts-link')
			const copy = document.createElement('button')
			copy.classList.add('main-shorter-links-link-texts-copy')

			ShorterLinks.appendChild(linkDiv)
			linkDiv.appendChild(texts)
			texts.appendChild(name)
			texts.appendChild(link)
			texts.appendChild(copy)

			name.textContent = Link
			link.textContent = data.result.short_link
			copy.textContent = 'Copy'
			

			const test1 = {link: Link,Data: data.result.short_link}	

			Items.push(test1)
			console.log(Items);

			localStorage.setItem('Data',JSON.stringify(Items))
			localStorage.setItem('List',JSON.stringify(Items))

			copy.addEventListener('click', () => {
				const Parent = copy.parentNode
				const text = Parent.querySelector('.main-shorter-links-link-texts-link')
				copyContent(text.textContent, copy)
			})
		})
}
const LoadData = () => {
	// Items = localStorage.getItem('List')
	const data = JSON.parse(localStorage.getItem('Data'))
	if (data) {
		data.forEach(d => {
			const linkDiv = document.createElement('div')
			linkDiv.classList.add('main-shorter-links-link')
			const texts = document.createElement('div')
			texts.classList.add('main-shorter-links-link-texts')
			const name = document.createElement('p')
			name.classList.add('main-shorter-links-link-texts-name')
			const link = document.createElement('p')
			link.classList.add('main-shorter-links-link-texts-link')
			const copy = document.createElement('button')
			copy.classList.add('main-shorter-links-link-texts-copy')
			
			ShorterLinks.appendChild(linkDiv)
			linkDiv.appendChild(texts)
			texts.appendChild(name)
			texts.appendChild(link)
			texts.appendChild(copy)
			
			name.textContent = d.link
			link.textContent = d.Data
			copy.textContent = 'Copy'
			
			copy.addEventListener('click', () => {
				const Parent = copy.parentNode
				const text = Parent.querySelector('.main-shorter-links-link-texts-link')
				copyContent(text.textContent, copy)
			})
		})
	} else {
		return
	}
	
}
LoadData()

const copyContent = async (text, btn) => {
	try {
		await navigator.clipboard.writeText(text)
		btn.style.backgroundColor = 'hsl(257, 27%, 26%)'
		btn.textContent = 'Copied!'
		setTimeout(() => {
			btn.style.backgroundColor = 'rgb(42, 207, 207)'
			btn.textContent = 'Copy'
		}, 5000)
	} catch (err) {
		console.error('Failed to copy: ', err)
	}
}

// DropDown function

BurgerIcon.addEventListener('click', () => {
	DropDown.classList.toggle('active')
})

SubmitBtn.addEventListener('click', () => {
	const Link = LinkInput.value.trim()
	if (Link === '') {
		console.log('pusty')
	} else {
		FetchData(Link)
	}
})
