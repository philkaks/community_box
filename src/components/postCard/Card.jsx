import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ShareIcon, CommentIcon, LikeIcon } from '../icons/Icons'
import Skeleton from '@mui/material/Skeleton'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { GoogleIcon } from '../../components'
import { signInWithGoogle } from '../../backend/auth'
import { useDispatch } from 'react-redux'

const style = {
    width: '800px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: 24,
    p: 2,
    '@media (max-width: 768px)': {
        width: '90%',
    },
}

const styleLogin = {
    width: '420px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: 24,
    p: 2,
    '@media (max-width: 768px)': {
        width: '90%',
    },
}

const socialMedia = [
    {
        name: 'Facebook',
        icon: <FacebookIcon />,
        url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
        name: 'Twitter',
        icon: <TwitterIcon />,
        url: 'https://twitter.com/intent/tweet?url=',
    },
    {
        name: 'Instagram',
        icon: <InstagramIcon />,
        url: 'https://www.instagram.com/share?url=',
    },
]

const Card = ({ post, comment = false, quantity = false, loading = false }) => {
    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth.accessToken)
    const [commentSec, setCommentSec] = React.useState(false)
    const [open, setOpen] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleComment = () => {
        setCommentSec(!commentSec)
    }

    const handleSignWithGoogle = async () => {
        try {
            const res = await signInWithGoogle()
            if (res.success === true) {
                dispatch({
                    type: 'SET_USER',
                    payload: {
                        displayName: res.user.displayName,
                        email: res.user.email,
                        photoURL: res.user.photoURL,
                        uid: res.user.uid,
                    },
                })
                dispatch({
                    type: 'SET_ACCESS_TOKEN',
                    payload: res.accessToken,
                })
                window.location.href = '/community_box'
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            key={post.id}
            className="max-w-2xl mx-auto h-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <div className="py-4">
                <div className="px-2 md:px-4 font-bold text-xl mb-2 flex items-center">
                    {loading ? (
                        <Skeleton variant="text" width={150} height={24} />
                    ) : (
                        <h1>{post.title}</h1>
                    )}
                </div>
                <p className="px-2 md:px-4 text-gray-700 lg:text-base text-sm">
                    {loading ? (
                        <Skeleton variant="text" width="100%" height={80} />
                    ) : (
                        post.description
                    )}
                </p>
                <div
                    className={`w-full h-auto md:px-4 md:rounded-lg mt-4 mb-2 `}
                >
                    {loading ? (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={300}
                        />
                    ) : (
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            showIndicators={false}
                            infiniteLoop
                            autoPlay
                            swipeable
                            emulateTouch
                            interval={5000}
                            transitionTime={500}
                        >
                            {post.images.map((image, index) => (
                                <img
                                    style={{ maxHeight: '520px' }}
                                    key={index}
                                    className="w-full h-full object-cover md:rounded-lg"
                                    src={image}
                                    alt="post image"
                                />
                            ))}
                        </Carousel>
                    )}
                </div>
            </div>
            <div className="px-2 md:px-6 pt-2 lg:flex lg:flex-row-reverse justify-between flex flex-col-reverse pb-2 w-full">
                <div className="space-x-2 flex justify-end mt-2">
                    {loading ? (
                        <Skeleton variant="circle" width={24} height={24} />
                    ) : (
                        <button
                            onClick={() => {
                                if (accessToken) {
                                    // handleComment()
                                } else {
                                    setOpenLogin(true)
                                }
                            }}
                            className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                        >
                            <LikeIcon fill="none" width="24" height="24" />
                            <span className="ml-2">like</span>
                        </button>
                    )}
                    {comment && (
                        <button
                            onClick={() => {
                                if (accessToken) {
                                    handleComment()
                                } else {
                                    setOpenLogin(true)
                                }
                            }}
                            className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                        >
                            <CommentIcon
                                fill="none"
                                width="24"
                                height="24"
                                className="mr-1"
                            />

                            <span className="ml-2">comment</span>
                        </button>
                    )}
                    <button
                        onClick={handleOpen}
                        className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                    >
                        {loading ? (
                            <Skeleton variant="circle" width={24} height={24} />
                        ) : (
                            <ShareIcon fill="none" width="24" height="24" />
                        )}
                        <span className="ml-2">share</span>
                    </button>
                </div>
                <div className="flex">
                    {loading ? (
                        <Skeleton variant="circle" width={40} height={40} />
                    ) : (
                        <img
                            className="w-8 h-8 rounded-full mr-4"
                            src={post.photoURL}
                            alt="Avatar"
                        />
                    )}
                    <div>
                        {loading ? (
                            <Skeleton variant="text" width={100} height={20} />
                        ) : (
                            <>
                                <h4>{post.displayName}</h4>
                                <p className="text-gray-400 text-sm">
                                    {post.createdAt.toDate().toDateString()}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {quantity && (
                <div
                    className="px-6 pt-4 pb-2 flex items-center border-t-2"
                    style={{
                        borderTopColor: '#1c274c',
                    }}
                >
                    Quantity available:
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-700 bg-gray-200 rounded-full">
                        {loading ? (
                            <Skeleton variant="text" width={20} height={16} />
                        ) : (
                            post.quantity
                        )}
                    </span>
                </div>
            )}
            {/* comment input field */}
            {commentSec && (
                <div className="px-2 md:px-6 py-2">
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            placeholder="Add a comment"
                            className="w-full px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded-lg  focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-0"
                        />
                        <button className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none">
                            Post
                        </button>
                    </div>
                </div>
            )}

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Share on
                    </Typography>
                    <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        {socialMedia.map((social) => (
                            <div
                                key={social.name}
                                className="flex items-center justify-between px-4 py-2 my-2 bg-gray-200 rounded-lg"
                            >
                                <div className="flex items-center">
                                    {social.icon}
                                    <span className="ml-2">{social.name}</span>
                                </div>
                                <a
                                    href={`${social.url}${window.location.href}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <button className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none">
                                        Share
                                    </button>
                                </a>
                            </div>
                        ))}
                    </Box>
                </Box>
            </Modal>
            <Modal
                keepMounted
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={styleLogin}>
                    <Typography variant="h6" component="h2">
                        Login to Continue
                    </Typography>
                    <Box
                        sx={{
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            marginTop: '10px',
                        }}
                        className="space-y-2"
                    >
                        <button
                            onClick={() => {
                                handleSignWithGoogle()
                            }}
                            className="px-4 py-2 flex justify-center w-full font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        >
                            <GoogleIcon
                                fill="none"
                                width="24"
                                height="24"
                                className="mr-1"
                            />
                            <span className="ml-2">Login with Google</span>
                        </button>
                        <button
                            onClick={() => {
                                return null
                            }}
                            className="px-4 py-2 flex justify-center w-full font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        >
                            Login with Email and Password
                        </button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default Card
