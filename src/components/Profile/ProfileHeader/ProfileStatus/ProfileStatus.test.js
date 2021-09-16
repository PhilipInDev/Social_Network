import React from 'react';
import ProfileStatus from "./ProfileStatus";
import {putUserStatus} from "../../../../reducers/profile";
import {render, screen} from "@testing-library/react";

describe('ProfileStatus', () => {
        it('Status', () => {
            render(
                <ProfileStatus
                    statusEditable={true}
                    userStatus={'Morty became a man!'}
                    putUserStatus={putUserStatus}
                />);
            expect(screen.getByText(/Morty became a man!/i)).toBeInTheDocument()
        })
    }
)
