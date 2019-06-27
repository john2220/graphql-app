import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { query } from './Names';
// import uuid from 'uuid/v1';

const POST_NAME = gql`
mutation insert_profile (
	$name: String
	) {
		insert_profile(
		objects: [
		{
			name: $name
		}
		]
		) {
			returning {
				id
				name
				editing
			}
		}
	}
	`

class AddNames extends Component {

	state = {
		name: ''
	}

	render() {
		const { name } = this.state
		return (
			<div>
			<input
			value={name}
			onChange={e => this.setState({ name: e.target.value })}
			type="text"
			placeholder="add name"
			/>
			<Mutation mutation={POST_NAME}>
			{postName => (
				<button onClick={() => {
					postName({
						variables: {
							name
						},
						update: (store, { data }) => {
							const stored = store.readQuery({
								query
							});

							store.writeQuery({ 
								query,
								data: {
									profile: [ ...stored.profile, ...data.insert_profile.returning]
								} 
							});
						}
					})
				}}>
				Submit
				</button>
				)}
			</Mutation>
			</div>
		)
	}
}

export default AddNames;