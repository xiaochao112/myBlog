const express = require('express');
const svgCaptcha = require('svg-captcha');

const router = express.Router({
	mergeParams: true,
})
/**
 * @api {get} /captcha/index 获取验证码
 * @apiName 获取验证码
 * @apiGroup user
 *
 */
router.get('/index', function (req, res) {
	var captcha = svgCaptcha.create({
		color: true
	});
	// req.session.captcha = captcha.text;
	const data = Buffer.from(captcha.data, 'utf-8').toString('base64');
	let base64 = 'data:image/svg+xml;base64,' + data;
	res.type('base64');
	res.status(200).send(base64);
});