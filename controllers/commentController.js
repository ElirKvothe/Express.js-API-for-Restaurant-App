const commentModel = require('../models/commentModel');

// Tüm yorumları listeleme
exports.getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.getAllComments();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Belirli bir yorumu ID ile getirme
exports.getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await commentModel.getCommentById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Belirli bir restoranın yorumlarını listeleme
exports.getCommentsByRestaurantId = async (req, res) => {
    const { restaurant_id } = req.params;
    try {
        const comments = await commentModel.getCommentsByRestaurantId(restaurant_id);
        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this restaurant' });
        }
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni yorum oluşturma
exports.createComment = async (req, res) => {
    const { user_id, restaurant_id, title, description, score } = req.body;
    try {
        const newComment = await commentModel.createComment(user_id, restaurant_id, title, description, score);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yorumu güncelleme
exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { user_id, restaurant_id, title, description, score } = req.body;
    try {
        const updatedComment = await commentModel.updateComment(id, user_id, restaurant_id, title, description, score);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yorumu silme
exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await commentModel.deleteComment(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
