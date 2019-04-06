import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { setFilter } from "./../actions/index.jsx";
import { VISIBILITY_FILTER } from "./../constants/index.jsx";


const VisibilityFilters = ({ activeFilter, setFilter }) => {
	return(
		<div className="visibility-filters">
			{
				Object.keys(VISIBILITY_FILTER).map( filterKey => {
					const curFilter = VISIBILITY_FILTER[filterKey];
					console.log("activeFilter: ");
					console.log(activeFilter);

					return(
						<span
							key={`visibility-filter-${curFilter}`}
							className={ cx("filter",curFilter === activeFilter && "filter-active") }
							onClick={ () => {
								setFilter(curFilter)
							} }
						>
							{ curFilter }
						</span>
					);
				} )
			}
		</div>
	);
};

const mapStateToProps = state => {
	return { activeFilter: state.visibilityFilter }
};

export default connect(
	mapStateToProps,
	{ setFilter }
)(VisibilityFilters);
