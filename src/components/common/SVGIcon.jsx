import {
	CameraSVG,
	ImageSVG,
	AISVG,
	PaletteSVG,
	ReportSVG,
	ObjectSVG,
    SearchSVG,
} from '@icons';

const iconMap = {
	camera: CameraSVG,
	image: ImageSVG,
	AI: AISVG,
	palette: PaletteSVG,
	report: ReportSVG,
	object: ObjectSVG,
    search: SearchSVG,
};

/**
 * @param {string} name camera, image, AI, palette, report
 * @param {*} rest
 * @reutrn SVG component
 * @example name, width, height, color가 모두 지정되어야 합니다.
 * ```
<SVGIcon name={'camera'}
    width={25} height={25}
    color={COLOR.PRIMARY}
/>
 * ```
 * 
 */

const SVGIcon = ({ name, ...rest }) => {
	const SVG = iconMap[name];
	return SVG ? <SVG key={name} {...rest} /> : null;
};

export default SVGIcon;
