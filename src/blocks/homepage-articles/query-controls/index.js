/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { QueryControls as BaseControl, SelectControl, ToggleControl } from '@wordpress/components';

class QueryControls extends Component {
	render = () => {
		const {
			authorList,
			postList,
			tagsList,
			onAuthorChange,
			onSingleChange,
			onTagChange,
			selectedSingleId,
			selectedAuthorId,
			selectedTagId,
			singleMode,
			onSingleModeChange,
			enableSingle,
		} = this.props;
		return [
			enableSingle && (
				<ToggleControl
					checked={ singleMode }
					onChange={ onSingleModeChange }
					label={ __( 'Choose specific story' ) }
				/>
			),
			singleMode && (
				<SelectControl
					key="query-controls-single-post-select"
					label={ __( 'Display One Specific Post', 'newspack-blocks' ) }
					value={ selectedSingleId }
					options={ [
						{ label: __( '-- Select Post --', 'newspack-blocks' ), value: '' },
						...( postList || [] ).map( post => ( { label: post.title.rendered, value: post.id } ) ),
					] }
					onChange={ onSingleChange }
				/>
			),
			! singleMode && <BaseControl { ...this.props } />,
			! singleMode && onAuthorChange && (
				<SelectControl
					key="query-controls-author-select"
					label={ __( 'Author', 'newspack-blocks' ) }
					value={ selectedAuthorId }
					options={ [
						{ label: __( 'Any author', 'newspack-blocks' ), value: '' },
						...( authorList || [] ).map( author => ( { label: author.name, value: author.id } ) ),
					] }
					onChange={ onAuthorChange }
				/>
			),
			! singleMode && onTagChange && (
				<SelectControl
					key="query-controls-tag-control"
					label={ __( 'Tag', 'newspack-blocks' ) }
					value={ selectedTagId }
					options={ [
						{ label: __( 'All', 'newspack-blocks' ), value: '' },
						...( tagsList || [] ).map( tag => ( { label: tag.name, value: tag.id } ) ),
					] }
					onChange={ onTagChange }
				/>
			),
		];
	};
}

QueryControls.defaultProps = {
	authorList: [],
	postList: [],
	tagsList: [],
	enableSingle: true,
};

export default QueryControls;
