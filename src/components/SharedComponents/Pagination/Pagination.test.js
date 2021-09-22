import {render, waitFor} from "@testing-library/react";
import Pagination from "./Pagination";
import {BrowserRouter} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import {getUsers} from "../../../reducers/findFriends";

describe('Pagination', () => {
    const mockGetUsers = jest.fn(getUsers);

    test('Number of pagination links is correct on page #1', () => {
        const { getAllByText } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={1}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                />
            </BrowserRouter>
        )
        expect(getAllByText(/[0-9]/i).length).toBe(6);
    })
    test('Number of pagination links is correct on page #6', () => {
        const { getAllByText } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={6}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                />
            </BrowserRouter>
        )
        expect(getAllByText(/[0-9]/i).length).toBe(7);
    })
    test('Number of pagination links is correct on the last page', () => {
        const { getAllByText } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={1464}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                />
            </BrowserRouter>
        )
        expect(getAllByText(/[0-9]/i).length).toBe(5);
    })
    test('Number of spaces is correct on page #1', () => {
        const { getAllByText } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={1}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                />
            </BrowserRouter>
        )
        expect(getAllByText('...').length).toBe(1);
    })
    test('Number of spaces is correct on page #6', () => {
        const { getAllByText } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={6}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                />
            </BrowserRouter>
        )
        expect(getAllByText('...').length).toBe(2);
    })
    test('Number of spaces is correct on the last page', () => {
        const { getAllByText } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={1464}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                />
            </BrowserRouter>
        )
        expect(getAllByText('...').length).toBe(1);
    })
    test('Click on the right arrow at the last link changes link set to the higher one(1-5 => 6-10)', async () => {
        const { getByTestId, findAllByText, rerender } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={5}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                    getItems={mockGetUsers}
                />
            </BrowserRouter>
        )
        userEvent.click(getByTestId('next'));
        await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(1))
        rerender(
            <BrowserRouter>
                <Pagination
                    currentPage={6}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                    getItems={mockGetUsers}
                />
            </BrowserRouter>
        )
        expect(await findAllByText(/^[6-9]$|(10){1}/i)).toHaveLength(5);
    })
    test('Click on the left arrow at the first link changes link set to the lower one(6-10 => 1-5)', async () => {
        const { getByTestId, findAllByText, rerender } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={6}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                    getItems={mockGetUsers}
                />
            </BrowserRouter>
        );
        userEvent.click(getByTestId('prev'));
        await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(1));
        rerender(
            <BrowserRouter>
                <Pagination
                    currentPage={5}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                    getItems={mockGetUsers}
                />
            </BrowserRouter>
        );
        expect(await findAllByText(/^[1-5]$/i)).toHaveLength(5);
    })
    test('Click on the right arrow changes current page to the higher one', async () => {
        const { getByTestId, rerender } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={5}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                    getItems={mockGetUsers}
                />
            </BrowserRouter>
        )
        expect(getByTestId('current page')).toContainHTML('5');
        userEvent.click(getByTestId('next'));
        await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(1));
        rerender(
            <BrowserRouter>
                <Pagination
                    currentPage={6}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                    getItems={mockGetUsers}
                />
            </BrowserRouter>
        )
        expect(getByTestId('current page')).toContainHTML('6');
    })
    test('Click on the left arrow changes current page to the lower one', async () => {
        const { getByTestId, rerender } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={6}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                    getItems={mockGetUsers}
                />
            </BrowserRouter>
        )
        expect(getByTestId('current page')).toContainHTML('6');
        userEvent.click(getByTestId('prev'));
        await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(1));
        rerender(
            <BrowserRouter>
                <Pagination
                    currentPage={5}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                    getItems={mockGetUsers}
                />
            </BrowserRouter>
        )
        expect(getByTestId('current page')).toContainHTML('5');
    })
    test('Click on the right space(...) changes link set to the higher one',() => {
        const { getByText, getAllByText } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={1}
                    itemsCount={10}
                    totalCount={14640}
                    numOfLinks={5}
                />
            </BrowserRouter>
        )
        expect(getAllByText(/^[1-5]$/i)).toHaveLength(5);
        userEvent.click(getByText('...'));
        expect(getAllByText(/^[6-9]$|^(10)$/i)).toHaveLength(5);
    })
    test('Click on the left space(...) changes link set to the lower one',() => {
        const { getByText, getAllByText } = render(
            <BrowserRouter>
                <Pagination
                    currentPage={154}
                    itemsCount={10}
                    totalCount={1540}
                    numOfLinks={5}
                />
            </BrowserRouter>
        )
        expect(getAllByText(/^(15\d)/i)).toHaveLength(4);
        userEvent.click(getByText('...'));
        expect(getAllByText(/^(14\d)|^(150)/i)).toHaveLength(5);
    })
})

