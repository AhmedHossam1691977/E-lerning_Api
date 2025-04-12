import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [1, 'too short courses name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
    },
    image: String,
    dateOfCours: Date,
    isPay: {
        type: Boolean,
        default: false
    },
    payPy: [{
        type: mongoose.Types.ObjectId,
        ref: "user",
    }],
    price: {
        type: Number,
        min: 0,
    },
    userAddress: {
        street: String,
        city: String,
        phone: String
    },
    numberOfPayed: {
        type: Number,
        min: 0,
    },
}, { timestamps: true, toJSON: { virtuals: true } });

// virtual populate for All weeks in the course
schema.virtual('allWeeks', {
    ref: 'week',
    localField: "_id",
    foreignField: 'coursId'
});

schema.pre("findOne", function() {
    this.populate('allWeeks').populate('payPy', 'name email'); // يمكنك إضافة حقول إضافية تحتاجها
});

export const coursesModel = mongoose.model('cours', schema);