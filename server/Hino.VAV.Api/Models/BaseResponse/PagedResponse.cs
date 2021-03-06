﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Execution;
using Hino.VAV.Concerns.Exceptions;
using Hino.VAV.Models;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http2.HPack;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Hino.VAV.Api.Models.BaseResponse
{
    public class PagedResponse<T, TDto>
        where T : IEntityRoot
        where TDto : IDtoRoot, new()
    {
        private readonly IMapper _mapper;

        public PagedResponse(IMapper mapper, IEnumerable<T> entity, int pageSize, int pageNo)
        {
            var totalRecords = entity.Count();
            TotalPages = totalRecords == 0 ? 0
                : (totalRecords / pageSize);

            TotalPages = totalRecords % pageSize != 0 ? TotalPages + 1 : TotalPages;

            _mapper = mapper;
            Page = pageNo;
            IEnumerable<T> pagedRecord = entity.Skip(pageSize * (pageNo - 1)).Take(pageSize).ToArray();
            Result = _mapper.Map<IEnumerable<TDto>>(pagedRecord);
        }

        public int Page { get; }

        public int TotalPages { get; }

        public IEnumerable<TDto> Result { get; }
    }
}