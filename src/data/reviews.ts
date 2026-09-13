import { CustomerReview } from '../types';

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-diego',
    author: 'Diego Morissens',
    location: 'San Fabian, Pangasinan',
    rating: 5,
    date: 'April 11, 2022',
    boardModel: 'Saint Joe Fiberglass (Double Carbon also offered)',
    title: 'Affordable quality skimboard that directly competes against well known brands',
    comment: "Ordered a skimboard because i remember the brand from when i used to own one when I was younger, lets say it wasn't taken care of as well as it should have, but it held up for quite well even after the nearing end of its lifetime. Despite my boards being fiberglass (they offer double carbon too), I found that that stiffness was adequate for beginner and intermediate riders, the epoxy used is high-quality and hard and I really commend this brand for having affordable quality skimboard that directly competes against other well known brands with the fraction of the cost, with the added benifit of the owner being very kind and knowledgeable, thank you so much saint joe skimboards",
    verified: true,
    source: 'Facebook Recommendation'
  },
  {
    id: 'rev-erwin',
    author: 'Erwin Gabia',
    location: 'Candelaria, Quezon',
    rating: 5,
    date: 'September 20, 2022',
    boardModel: 'Double Carbon with Triple Carbon Rail (Fishtail Shape)',
    title: 'Perfect board control for ollies',
    comment: 'Highly recommended yung double carbon with triple carbon rail. Fishtail shape, perfect board control for ollies.',
    verified: true,
    source: 'Facebook Recommendation'
  }
];
