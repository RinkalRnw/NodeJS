const model = require('../models/mongoosedb');
const rolemodel = require('../models/roleModel');
// const sendinBlue = require('sib-api-v3-sdk');
const express = require('express');
const nodemailer = require('nodemailer')
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
const savedata = async (req, res) => {

    const { name, email, number, role_id, googleId } = req.body;
    console.log(req.body)

    const checkuserrole = await model.findOne({ role_id }).populate('role_id');
    let roleData = await rolemodel.find({ isActive: 1 });
    let rolename = checkuserrole.role_id.rolename;
    console.log(rolename);
    localStorage.setItem('userRole', JSON.stringify(rolename));
    if (email && name && number) {
        if (checkuserrole) {
            if (checkuserrole.role_id.rolename == 'Admin') {
                req.flash('info', 'Admin is already registered!');
                res.render('signup', { message2: req.flash('info'), roleData: roleData });
            } else if (checkuserrole.role_id.rolename == 'Manager') {
                const checkmanager = await model.find({ role_id });
                if (checkmanager.length == 2) {
                    req.flash('info', 'Two Managers already registered!');
                    res.render('signup', { message2: req.flash('info'), roleData: roleData });
                } else {
                    let data = await model.findOneAndUpdate({ googleId }, {
                        $set: {
                            name: name,
                            number: number,
                            email: email,
                            role_id: role_id
                        }
                    });

                    // let data = new model({
                    //     name: name,
                    //     number: number,
                    //     email: email,
                    //     role_id: role_id
                    // })

                    const mailInfo = {

                        from: "vishalchavda7781@gmail.com",
                        to: email,
                        subject: "Vishal Chavda Admin Panel",
                        text: "Registration",
                        html: "<p>You are successfully registered </p>"

                    }

                    // await transporter.sendMail(mailInfo)

                    // await data.save();
                    //JWT token generate
                    // var token = jwt.sign({data:data},secretKey);
                    // let _id = data._id;
                    // const result = await model.findByIdAndUpdate({_id},{$set:{token:token}})


                    res.redirect('/admin/home');
                }

            }
            else if (checkuser) {
                req.flash('info', 'Email is already registered!');
                res.render('signup', { message2: req.flash('info'), roleData: roleData });
            }
        }

        else {
            let data = await model.findOneAndUpdate({ googleId }, {
                $set: {
                    name: name,
                    number: number,
                    email: email,
                    role_id: role_id
                }
            });

            const mailInfo = {

                from: "vishalchavda7781@gmail.com",
                to: email,
                subject: "Vishal Chavda Admin Panel",
                text: "Registration",
                html: "<p>You are successfully registered </p>"

            }

            // await transporter.sendMail(mailInfo)

            // await data.save();

            res.redirect('/admin/home');

        }

    } else {

        req.flash('info', 'Please Enter All the Fields!');
        res.render('signup', { message2: req.flash('info'), roleData: roleData });

    }

}

const loginDetails = (req, res) => {
    res.render('loginDetails', {

    });
}

module.exports = { loginDetails, savedata }