import React from 'react';

const Author = () => {
    return (
        <div class="widget">
            <div class="widget-author">
                <div class="author-img">
                    <a href="author.html" class="image">
                        <img src={window.location.origin +"/assets/img/author/1.jpg"} alt=""/>
                    </a>
                </div>
                <div class="author-content">
                    <h6 class="name"> Hi, I'm David Smith</h6>
                    <p class="bio">
                        I'm David Smith, husband and father ,
                        I love Photography,travel and nature. I'm working as a writer and blogger with experience
                        of 5 years until now.
                    </p>
                    <div class="social-media">
                        <ul class="list-inline">
                            <li>
                                <a href="#" class="color-facebook">
                                    <i class="fab fa-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="color-instagram">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="color-twitter">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="color-youtube">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="color-pinterest">
                                    <i class="fab fa-pinterest"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;