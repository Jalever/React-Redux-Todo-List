import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { setFilter } from "./../actions/actions.jsx";
import { VISIBILITY_FILTERS } from "./../constants/constants.jsx";

//activeFilter: 有下滑线的filter
const FilterArea = ({ activeFilter, setFilter }) => {
	return(
		<div>
			{
				Object.keys(VISIBILITY_FILTERS).map( val => {
					const curFilterValue = VISIBILITY_FILTERS[val];

					return(
						<span
							key={`visibility-filter-${curFilterValue}`}
							className={	cx(	"filter",curFilterValue === activeFilter && "filter-active")
							}
							onClick={ () => {
								setFilter(curFilterValue);
							} }
						>
							{ curFilterValue }
						</span>
					);
				} )
			}
		</div>
	);
};

//state.visibilityFilter: ALL, COMPLETED, INCOMPLETE
const mapStateToProps = state => {
	return {
		activeFilter: state.visibilityFilter
	};
};

export default connect(
	mapStateToProps,
	{ setFilter } 
)(FilterArea);





