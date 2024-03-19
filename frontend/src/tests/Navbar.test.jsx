import {Navlinks} from '../components/Navbar/Navbar';

describe('Navbar', () => {
  it('should render three correct links', () => {

    const expectedLinks = [
      { name: 'HOME', link: "/"},
      { name: 'MY BOOKINGS', link: "/Reservations" },
      { name: 'REVIEWS', link: "/CustomerReview"}, 
      { name: 'ABOUT US', link: "/#about" }
    ];

    const firstlink = Navlinks[0].link;
    const secondlink = Navlinks[1].link;
    const thirdlink = Navlinks[2].link;

    expect(firstlink).toEqual(expectedLinks[0].link);
    expect(secondlink).toEqual(expectedLinks[1].link);
    expect(thirdlink).toEqual(expectedLinks[2].link);
  });
});
