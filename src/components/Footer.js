import {React} from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="copyright">
                            <p>© Copyright {new Date().getFullYear()} <a href="#">AssiaGroupe</a>, All rights reserved.</p>
                        </div>
                        <div className="back">
                            <a href="#" className="back-top" style={{ display: 'inline' }}>
                                <i className="fas fa-arrow-up"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;